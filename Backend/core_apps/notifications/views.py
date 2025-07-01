from django_filters import ModelChoiceFilter, FilterSet
from rest_framework.permissions import  IsAdminUser, IsAuthenticated
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
    serializer_class = NotificationSerializer
    filterset_class = NotificationFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Notification.objects.all()
        else:
            return Notification.objects.filter(receiver=user)

    def get_object(self):
        notification = super().get_object()
        if notification.unread:
            notification.unread = False
            notification.save()
        return notification

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'retrieve' or self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
