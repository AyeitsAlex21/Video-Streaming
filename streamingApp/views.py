from django.shortcuts import render, HttpResponse
from django.http import JsonResponse

# Create your views here

def index(request):
    filepath = finders.find('my_app/index.html')
    if filepath:
        with open(filepath, 'r') as file:
            return HttpResponse(file.read(), content_type="text/html")
    else:
        return HttpResponse("index.html not found", status=404)