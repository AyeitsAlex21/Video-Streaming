from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import boto3
import requests

from ..models.video import Video
from ..models.resolution import Resolution
from ..serializers.video import VideoSerializer
from ..serializers.resolution import ResolutionSerializer

#from ..models.video import Video

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai
from openai import OpenAI
import json

# Load your API key securely

@csrf_exempt
def get_movie_recommendations(request):

    if request.method == 'POST':
        
        data = json.loads(request.body)
        user_input = data["input"]

        try:
            openai.api_key ='sk-proj-iaaVpteBhDoFrhOYtn5ST3BlbkFJggfbnDKwQ1YCPk29Lfrc'
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": user_input}
                ],
            )

            print(response)

            chat_response = response.get('choices')[0].get('message', {}).get('content', 'No response generated.')

            return JsonResponse({"response": chat_response}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    else:
        return JsonResponse({"error": "This endpoint only supports POST requests."}, status=400)


def upload_video(request):
    print(request)
    s3_client = boto3.client('s3', region_name='us-east-2',
                             aws_access_key_id='AKIA6J3O3SBJPJZO2GYN',
                             aws_secret_access_key='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')

    # You might want to dynamically set 'Key' based on user/session information
    video_presigned_url = s3_client.generate_presigned_url('put_object',
                                                           Params={
                                                               'Bucket': 'amplify-streamingapp-staging-87059-deployment',
                                                               'Key': f'videos/5/{request.data}',
                                                           },
                                                           ExpiresIn=3600)  # URL expires in 1 hour

    thumbnail_presigned_url = s3_client.generate_presigned_url('put_object',
                                                               Params={
                                                                   'Bucket': 'amplify-streamingapp-staging-87059-deployment',
                                                                   'Key': f'videos/5/{request.data.thumbnail}',
                                                               },
                                                               ExpiresIn=3600)  # URL expires in 1 hour

    return JsonResponse({"thumbnail": thumbnail_presigned_url, "video" : video_presigned_url})

def list_videos(request):
    """
    s3_client = boto3.client('s3')
    bucket_name = 'amplify-streamingapp-staging-87059-deployment'
    prefix = 'videos/'

    # List all subdirectories (prefixes) under the given prefix
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix, Delimiter='/')
    items = {}

    # https://amplify-streamingapp-staging-87059-deployment.s3.amazonaws.com/videos/4/video.mp4

    ctr = 0
    # Retrieve subfolder content
    for content in response.get('CommonPrefixes', []):
        subfolder_prefix = content.get('Prefix')
        # Now list objects within this subfolder
        subfolder_response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=subfolder_prefix)
        
        sub_items = {"id" : ctr, "name": "uhhh"}
        for obj in subfolder_response.get('Contents', []):
            # Assuming the object key format is "subfolder/filename"
            file_name = obj['Key'].split('/')[-1]
            
            if "thumbnail" in file_name:
                sub_items["thumbnail"] = f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}"
            else:
                sub_items["video"] = f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}"

        items[ctr] = sub_items
        ctr += 1
    """
    try:
        vidoes = Video.objects.all()
        serializer = VideoSerializer(vidoes, many=True)

        for data in serializer.data:
            data["video_url"] = f'{data["thumbnail_url"][:-13]}video.mov'

        return JsonResponse({"data": serializer.data})

    except Video.DoesNotExist:
        return JsonResponse({'message': 'The video does not exist'}, status=404)

def get_recommended(request):
    return HttpResponse("<h1>nice</h1>")