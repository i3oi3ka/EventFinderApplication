from django.db import models

from core_apps.events.models import Event


class Review(models.Model):
    EVENT_RATING = (
        ('1', 'One'),
        ('2', 'Two'),
        ('3', 'Three'),
        ('4', 'Four'),
        ('5', 'Five'),
    )

    rating = models.CharField(choices=EVENT_RATING, max_length=10)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
