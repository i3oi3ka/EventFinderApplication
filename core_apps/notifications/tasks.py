from celery import shared_task
from celery_singleton import Singleton
from django.db import transaction

from core_apps.events.models import Event
from main.celery import app
from core_apps.notifications.models import Notification
from core_apps.tickets.models import Ticket
from datetime import timedelta
from django.utils import timezone


@shared_task(base=Singleton)
def create_notification(ticket_id, title, message):
    with transaction.atomic():
        ticket = Ticket.objects.select_for_update().get(id=ticket_id)
        event = ticket.event
        user = ticket.user
        notification = Notification(event=event,
                                    receiver=user,
                                    title=title,
                                    text=message
                                    )
        notification.save()


@app.task
def check_upcoming_events():
    # Find events that are upcoming in the next 24 hours
    upcoming_events = Event.objects.filter(date__gte=timezone.now(), date__lte=timezone.now() + timedelta(days=1))

    # Create notifications for each upcoming event
    for event in upcoming_events:
        # Customize the notification creation logic based on your requirements
        title = 'Event is coming soon'
        notification_message = f"Event '{event.title}' is coming soon on {event.date}."
        tickets = event.sold_tickets.all()
        for ticket in tickets:
            create_notification.delay(ticket.id, title, notification_message)
