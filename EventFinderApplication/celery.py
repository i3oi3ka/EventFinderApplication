import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'EventFinderApplication.settings')
app = Celery('EventFinderApplication')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

