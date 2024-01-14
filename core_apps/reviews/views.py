from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from core_apps.reviews.models import Review
from core_apps.reviews.serializers import ReviewSerializer


class ReviewView(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

