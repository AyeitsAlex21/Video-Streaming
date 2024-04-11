from django.urls import path
from .views.video import *

urlpatterns = [
    path('listVideos/', list_videos, name="list-videos-home"),
    path('getRecommended/', get_recommended, name="get-recommended-videos"),
]