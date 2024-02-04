from celery import shared_task
from celery_singleton import Singleton
from django.db import transaction

from core_apps.notifications.models import Notification
from core_apps.tickets.models import Ticket


@shared_task(base=Singleton)
def create_notification(ticket_id):
    with transaction.atomic():
        ticket = Ticket.objects.select_for_update().get(id=ticket_id)
        event = ticket.event
        user = ticket.user
        notification = Notification(event=event,
                                    receiver=user,
                                    title=f'Change in event',
                                    text=f'Event {event.title} was changed'
                                    )
        notification.save()
