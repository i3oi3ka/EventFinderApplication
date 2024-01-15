from django.db import models

from core_apps.accounts.models import User
from core_apps.events.models import Event


class Ticket(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="sold_tickets")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            event = Event.objects.get(pk=self.event.id)
            event.free_tickets -= 1
            event.save()
        return super().save(*args, **kwargs)
