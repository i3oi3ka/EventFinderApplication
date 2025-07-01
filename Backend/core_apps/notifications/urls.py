from rest_framework.routers import DefaultRouter

from .views import NotificationView

router = DefaultRouter()
router.register('', NotificationView, basename='notification')

urlpatterns = router.urls
