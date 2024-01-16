from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from core_apps.events.models import Event
from core_apps.tickets.models import Ticket
from core_apps.tickets.serializers import TicketSerializer


class TicketView(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [IsAdminUser]


class MyTicketView(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        event = get_object_or_404(Event, pk=data['event'])
        if event.free_tickets == 0:
            return Response({'msg': 'sorry, no free tickets'}, status=status.HTTP_400_BAD_REQUEST)
