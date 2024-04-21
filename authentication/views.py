from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import EmailMessage, send_mail
from . import info
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import authenticate, login, logout
from . tokens import generate_token

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

import json

@csrf_exempt
def signup(request):
    if request.method == "POST":

        data = json.loads(request.body)

        username = data['username']
        fname = data['fname']
        lname = data['lname']
        email = data['email']
        pass1 = data['pass1']
        pass2 = data['pass2']
        
        if User.objects.filter(username=username).exists():
            print("username exists")
            return HttpResponse(status=406)
        
        if User.objects.filter(email=email).exists():
            print("email exists")
            return HttpResponse(status=406)
        
        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.is_active = True
        myuser.save()
        
        return HttpResponse(status=201)
    
    return HttpResponse(status=404)

@csrf_exempt
def signin(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        pass1 = data['pass1']
        
        user = authenticate(request, username=email, password=pass1)
        
        if user is not None:
            login(request, user)
            fname = user.first_name
            return JsonResponse(status=201, data={email:email})
        else:
            return HttpResponse(status=406)
    
    return HttpResponse(status=404)