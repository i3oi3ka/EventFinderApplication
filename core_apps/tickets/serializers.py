from rest_framework import serializers

from core_apps.tickets.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.nickname')

    class Meta:
        model = Ticket
        fields = "__all__"
