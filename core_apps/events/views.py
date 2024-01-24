from django_filters import DateFilter, CharFilter, DateFromToRangeFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework import filters, status
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


class EventFilter(FilterSet):
    title = CharFilter(lookup_expr='icontains')
    description = CharFilter(lookup_expr='icontains')
    date = DateFromToRangeFilter(field_name='date')
    category = CharFilter(field_name='category', lookup_expr='icontains')
    venue = CharFilter(field_name='venue', lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['title', 'description', 'date', 'category', 'venue']


class EventView(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'description']

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['update', 'delete', 'partial_update']:
            permission_classes = [IsOwnerOrAdminPermission]
        else:
            # permission_classes = [IsAuthenticated]
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
