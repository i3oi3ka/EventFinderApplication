from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import TicketView, MyTicketView

router = DefaultRouter()
router.register('', TicketView, basename='tickets')

urlpatterns = [
               path('my/', MyTicketView.as_view(), name='my_ticket'),
               ]
urlpatterns += router.urls
