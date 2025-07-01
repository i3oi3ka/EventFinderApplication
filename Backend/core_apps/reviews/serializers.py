from rest_framework import serializers

from core_apps.events.serializers import EventSerializer
from core_apps.reviews.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    # event_title = serializers.CharField(source='event.title', read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'event', 'user', 'rating', 'comment', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(ReviewSerializer, self).create(validated_data)
