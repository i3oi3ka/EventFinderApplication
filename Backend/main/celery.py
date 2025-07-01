import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')
app = Celery('main')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Configure periodic task to run every day at a specific time (e.g., midnight)
app.conf.beat_schedule = {
    'check-upcoming-events': {
        'task': 'core_apps.notifications.tasks.check_upcoming_events',
        'schedule': crontab(hour=0, minute=0),
    },
}
