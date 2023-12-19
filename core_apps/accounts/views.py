import django.contrib.auth
import django_filters
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, BasePermission, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from core_apps.accounts.models import User
from core_apps.accounts.serializers import UserSerializer, UserCreateSerializer, ChangePasswordSerializer


class IsOwnerOrAdminPermission(BasePermission):
    """
    Custom permission to only allow owners or admins to access an object.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin or the owner of the object
        return request.user.is_authenticated and (request.user.is_staff or request.user == obj)


# Create your views here.
class UserFilter(django_filters.FilterSet):
    nickname = django_filters.CharFilter(field_name='nickname', lookup_expr='icontains')
    username = django_filters.CharFilter(field_name='username', lookup_expr='icontains')

    class Meta:
        model = django.contrib.auth.get_user_model()
        fields = ['nickname', 'username']


class UserView(ModelViewSet):
    """
        list, get, create, update and delete user and settings for him.
    """
    queryset = User.objects.all().prefetch_related('settings')
    serializer_class = UserSerializer
    filterset_class = UserFilter

    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        # Add token data to the response
        response_data = {
            'user': serializer.data,
            'token': token_data,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [AllowAny]
        if self.action == 'retrieve' or self.action == 'list':
            permission_classes = [IsAuthenticatedOrReadOnly]
        else:
            permission_classes = [IsOwnerOrAdminPermission]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return UserCreateSerializer
        else:
            return UserSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsOwnerOrAdminPermission]
    serializer_class = ChangePasswordSerializer
