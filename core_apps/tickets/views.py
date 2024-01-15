from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

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

