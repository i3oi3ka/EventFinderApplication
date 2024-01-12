from rest_framework import serializers
from core_apps.events.models import Event


class EventSerializer(serializers.ModelSerializer):
    organizer = serializers.ReadOnlyField()
    class Meta:
        model = Event
        fields = ['organizer', 'category', 'title', 'description', 'like', 'image', 'num_of_seats', 'date', 'venue']

