from django_filters import ModelChoiceFilter, FilterSet
from rest_framework.permissions import BasePermission, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from core_apps.accounts.models import User

from core_apps.notifications.models import Notification
from core_apps.notifications.serializers import NotificationSerializer


class NotificationFilter(FilterSet):
    receiver = ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Notification
        fields = ['receiver']


class IsOwnerOrAdminPermission(BasePermission):
    """
    Custom permission to only allow owners or admins to access an object.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin or the owner of the object
        return request.user.is_authenticated and (request.user.is_staff or request.user == obj.receiver)


class NotificationView(ModelViewSet):
    # queryset = Notification.objects.all().prefetch_related(Prefetch('receiver', queryset=User.objects.all().only('username')))
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filterset_class = NotificationFilter

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
        if self.action == 'get':
            permission_classes = [IsOwnerOrAdminPermission]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
