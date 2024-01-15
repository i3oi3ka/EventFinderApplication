from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from core_apps.notifications.models import Notification
from core_apps.notifications.serializers import NotificationSerializer


class NotificationView(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

