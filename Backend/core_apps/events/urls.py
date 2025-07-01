from rest_framework.routers import DefaultRouter

from .views import EventView

router = DefaultRouter()
router.register('', EventView, basename='events')

urlpatterns = router.urls
