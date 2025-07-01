from rest_framework.routers import DefaultRouter

from .views import ReviewView

router = DefaultRouter()
router.register('', ReviewView, basename='reviews')

urlpatterns = router.urls
