from django.db import models

from core_apps.accounts.models import User
from core_apps.events.models import Event


class Notification(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128, blank=True, null=False)
    text = models.TextField(blank=True, null=False)
    unread = models.BooleanField(default=True)

