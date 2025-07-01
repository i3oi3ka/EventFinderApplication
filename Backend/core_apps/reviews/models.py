from django.db import models

from core_apps.accounts.models import User
from core_apps.events.models import Event
from core_apps.events.tasks import set_rating


class Review(models.Model):
    EVENT_RATING = (
        (1, 'One'),
        (2, 'Two'),
        (3, 'Three'),
        (4, 'Four'),
        (5, 'Five'),
    )

    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, default=1)
    rating = models.PositiveIntegerField(choices=EVENT_RATING)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        set_rating.delay(self.event_id)
