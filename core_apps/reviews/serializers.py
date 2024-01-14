from rest_framework import serializers

from core_apps.events.serializers import EventSerializer
from core_apps.reviews.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'event_title', 'event', 'rating', 'comment', 'created_at']
