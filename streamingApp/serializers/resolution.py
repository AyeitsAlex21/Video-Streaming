from rest_framework import serializers
from ..models.resolution import Resolution

class ResolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resolution
        fields = ['resolutionID', 'resolution', 'video_url', 'video']
