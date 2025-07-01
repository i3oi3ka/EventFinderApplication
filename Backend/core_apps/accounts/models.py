from django.contrib.auth.models import AbstractUser
from django.db import models


class Settings(models.Model):
    is_dark_mode = models.BooleanField(default=False)
    is_show_notifications = models.BooleanField(default=True)


class User(AbstractUser):
    nickname = models.CharField(max_length=255)
    settings = models.OneToOneField(Settings, on_delete=models.CASCADE, default=None, null=True, blank=True)
