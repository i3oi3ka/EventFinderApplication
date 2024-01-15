from rest_framework import serializers

from core_apps.accounts.serializers import UserSerializer
from core_apps.events.models import Event
from core_apps.tickets.serializers import TicketSerializer


class EventSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='organizer.username', read_only=True)
    free_tickets = serializers.IntegerField(read_only=True)
    sold_tickets = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'nickname', 'organizer', 'category', 'title', 'description', 'image', 'num_of_seats', 'date',
                  'venue',
                  'free_tickets',
                  'sold_tickets']

    def create(self, validated_data):
        # validated_data['organizer'] = self.context['request'].user
        validated_data['free_tickets'] = validated_data['num_of_seats']
        return super(EventSerializer, self).create(validated_data)
