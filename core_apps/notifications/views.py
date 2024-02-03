from django.shortcuts import render
from django_filters import ModelChoiceFilter, FilterSet
from rest_framework.viewsets import ModelViewSet

from core_apps.accounts.models import User
from core_apps.notifications.models import Notification
from core_apps.notifications.serializers import NotificationSerializer


class NotificationFilter(FilterSet):
    receiver = ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Notification
        fields = ['receiver']


class NotificationView(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filterset_class = NotificationFilter

    def get_object(self):
        notification = super().get_object()
        notification.unread = False
        notification.save()
        return notification
