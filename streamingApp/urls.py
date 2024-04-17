from django.urls import path
from .views.video import *

urlpatterns = [
    path('listVideos/', list_videos),
    path('getRecommended/', get_recommended, name="get-recommended-videos"),

    path('uploadVideo/', upload_video),
]