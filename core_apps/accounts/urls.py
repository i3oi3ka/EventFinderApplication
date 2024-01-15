from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserView, ChangePasswordView, ChangeUserToAdminView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)

router = DefaultRouter()
router.register('', UserView, basename='accounts')

urlpatterns = [path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
               path('change_user_to_admin/<int:pk>/', ChangeUserToAdminView.as_view(), name='change_user_to_admin'),
               path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
               path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
               path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
               path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
               ]
urlpatterns += router.urls
