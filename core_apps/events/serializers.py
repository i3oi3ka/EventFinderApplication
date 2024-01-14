from rest_framework import serializers

from core_apps.accounts.serializers import UserSerializer
from core_apps.events.models import Event


class EventSerializer(serializers.ModelSerializer):
    organizer = serializers.CharField(source='organizer.username', read_only=True)

    class Meta:
        model = Event
        fields = ['organizer', 'category', 'title', 'description', 'like', 'image', 'num_of_seats', 'date', 'venue',
                  'free_tickets']

    def create(self, validated_data):
        validated_data['organizer'] = self.context['request'].user
        return super(EventSerializer, self).create(validated_data)
