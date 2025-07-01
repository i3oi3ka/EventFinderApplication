from rest_framework import serializers, status
from rest_framework.response import Response

from core_apps.tickets.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'event', 'user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(TicketSerializer, self).create(validated_data)
