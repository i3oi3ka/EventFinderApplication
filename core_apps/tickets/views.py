from datetime import datetime, timezone

from django_filters.rest_framework import FilterSet, ModelChoiceFilter
from rest_framework import status
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404

from core_apps.accounts.models import User
from core_apps.events.models import Event
from core_apps.notifications.models import Notification
from core_apps.tickets.models import Ticket
from core_apps.tickets.serializers import TicketSerializer


class IsOwnerOrAdminPermission(BasePermission):
    """
    Custom permission to only allow owners or admins to access an object.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin or the owner of the object
        return request.user.is_authenticated and (request.user.is_staff or request.user == obj.user)


class TicketFilter(FilterSet):
    user = ModelChoiceFilter(queryset=User.objects.all())
    event = ModelChoiceFilter(queryset=Event.objects.all())

    class Meta:
        model = Ticket
        fields = ['user', 'event']


class TicketView(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    filterset_class = TicketFilter

    def create(self, request, *args, **kwargs):
        data = request.data
        event = get_object_or_404(Event, pk=data['event'])
        if event.date.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
            return Response({'msg': 'sorry, this event has passed'}, status=status.HTTP_400_BAD_REQUEST)
        if event.free_tickets == 0:
            return Response({'msg': 'sorry, no free tickets'}, status=status.HTTP_400_BAD_REQUEST)
        event.free_tickets -= 1
        event.save()
        notification = Notification(event=event,
                                    receiver=request.user,
                                    title=f'You success subscribe on event {event.title}',
                                    text=f'You success subscribe on event {event.title}'
                                    )
        notification.save()
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        data = request.data
        ticket = get_object_or_404(Ticket, pk=kwargs['pk'])
        event = ticket.event
        if event.date.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
            return Response({'msg': 'sorry, this event has passed'}, status=status.HTTP_400_BAD_REQUEST)
        event.free_tickets += 1
        event.save()
        notification = Notification(event=event,
                                    receiver=request.user,
                                    title=f'You success unsubscribe on event {event.title}',
                                    text=f'You success unsubscribe on event {event.title}'
                                    )
        notification.save()
        return super().destroy(request, *args, **kwargs)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsOwnerOrAdminPermission]
        return [permission() for permission in permission_classes]


class MyTicketView(ListAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
