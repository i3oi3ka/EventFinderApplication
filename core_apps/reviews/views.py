from datetime import timezone, datetime

from django_filters import ModelChoiceFilter
from django_filters.rest_framework import FilterSet
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import BasePermission, AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core_apps.accounts.models import User
from core_apps.events.models import Event
from core_apps.reviews.models import Review
from core_apps.reviews.serializers import ReviewSerializer
from core_apps.tickets.models import Ticket
from core_apps.events.tasks import set_rating


class IsOwnerOrAdminPermission(BasePermission):
    """
    Custom permission to only allow owners or admins to access an object.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin or the owner of the object
        return request.user.is_authenticated and (request.user.is_staff or request.user == obj.user)


class ReviewFilter(FilterSet):
    user = ModelChoiceFilter(queryset=User.objects.all())
    event = ModelChoiceFilter(queryset=Event.objects.all())

    class Meta:
        model = Review
        fields = ['user', 'event']


class ReviewView(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    filterset_class = ReviewFilter

    def create(self, request, *args, **kwargs):
        data = request.data
        event = get_object_or_404(Event, pk=data['event'])
        user = self.request.user
        if event.date.replace(tzinfo=timezone.utc) > datetime.now(timezone.utc):
            return Response({'msg': 'sorry, this event has not passed'},
                            status=status.HTTP_400_BAD_REQUEST)
        if not Ticket.objects.filter(event=event, user=user):
            return Response({'msg': 'sorry, you do not have a ticket for this event'},
                            status=status.HTTP_400_BAD_REQUEST)
        # set_rating.delay(event.pk)
        return super().create(request, *args, **kwargs)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['update', 'partial_update', 'delete']:
            permission_classes = [IsOwnerOrAdminPermission]
        else:
            permission_classes = [AllowAny]
            # permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
