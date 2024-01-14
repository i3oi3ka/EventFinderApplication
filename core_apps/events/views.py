import django_filters
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core_apps.events.models import Event
from core_apps.events.serializers import EventSerializer


class IsOwnerOrAdminPermission(BasePermission):
    """
    Custom permission to only allow owners or admins to access an object.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin or the owner of the object
        return request.user.is_authenticated and (request.user.is_staff or request.user == obj.organizer)


class EventFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    # organizer = django_filters.CharFilter(field_name='organizer', lookup_expr='icontains')
    date = django_filters.DateFilter(field_name='date', lookup_expr='icontains')
    category = django_filters.CharFilter(field_name='category', lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['title', 'organizer']


class EventView(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #
    #     data['organizer'] = request.user
    #     serializer = EventSerializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'update' or self.action == 'delete':
            permission_classes = [IsOwnerOrAdminPermission]
        else:
            # permission_classes = [IsAuthenticated]
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
