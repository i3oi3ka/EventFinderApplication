import datetime
from django.db.models import F, Sum, Count

from celery import shared_task
from celery_singleton import Singleton
from django.conf import settings
from django.core.cache import cache
from django.db import transaction
from .models import Event


@shared_task(base=Singleton)
def set_rating(event_id):
    with transaction.atomic():
        event = Event.objects.select_for_update().get(id=event_id)
        annotated_rating = event.reviews.aggregate(
            sum_rating=Sum('rating'), count_reviews=Count('id')
        )
        event.rating = annotated_rating['sum_rating'] / annotated_rating['count_reviews'] if annotated_rating['count_reviews'] else 0
        event.save()



