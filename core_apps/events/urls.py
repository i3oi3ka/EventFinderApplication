from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import EventView

router = DefaultRouter()
router.register('', EventView, basename='event')

urlpatterns = router.urls
