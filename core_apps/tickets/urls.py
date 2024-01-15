from rest_framework.routers import DefaultRouter

from .views import TicketView, MyTicketView

router = DefaultRouter()
router.register('my', MyTicketView, basename='my_tickets')
router.register('', TicketView, basename='tickets')


urlpatterns = router.urls
