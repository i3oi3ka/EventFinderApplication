from django.db import models

from core_apps.accounts.models import User


# Create your models here.
class Event(models.Model):
    EVENT_CATEGORY = (
        ('sports', 'Sports'),
        ('conferences', 'Conferences'),
        ('expos', 'Expos'),
        ('concerts', 'Concerts'),
        ('festivals', 'Festivals'),
        ('community', 'Community'),
        ('another', 'Another')
    )

    category = models.CharField(choices=EVENT_CATEGORY, max_length=25, default='another')
    organizer = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=False, related_name='event_organize')
    title = models.CharField(max_length=256)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    like = models.ManyToManyField(User, blank=True, related_name='liked_event')
    image = models.ImageField(upload_to='events/image', blank=True, null=True)
    num_of_seats = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(null=False)
    venue = models.CharField(null=False, max_length=256, blank=True)
    free_tickets = models.PositiveIntegerField()

    def __str__(self):
        return f'Event: {self.title}, date: {self.date}, organizer: {self.organizer}'
