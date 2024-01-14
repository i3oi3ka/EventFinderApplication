from rest_framework.viewsets import ModelViewSet

from core_apps.tickets.models import Ticket
from core_apps.tickets.serializers import TicketSerializer


class TicketView(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
