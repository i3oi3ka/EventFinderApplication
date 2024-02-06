from rest_framework import serializers

from core_apps.notifications.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    unread = serializers.BooleanField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'unread', 'created_at', 'title', 'text', ]
