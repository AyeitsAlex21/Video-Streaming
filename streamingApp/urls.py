from django.urls import path
from .views.video import *

urlpatterns = [
    path('list_videos/', list_videos, name="list-videos-home"),
    path('get_recommended/', get_recommended, name="get-recommended-videos"),
]