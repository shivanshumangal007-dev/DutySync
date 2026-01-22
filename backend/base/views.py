from django.http import JsonResponse
from .models import Login
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render, redirect
from rest_framework import generics
from .serializers import TaskSerializer
from .models import Task
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt    
def login_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # 1. Verify the credentials against the User database
            # Note: We use username=email because we're treating email as the unique ID
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # 2. Start the session (this logs them in)
                login(request, user)
                
                # 3. Send back details so React knows their role
                return JsonResponse({
                    "status": "success",
                    "message": "Login successful",
                    "user": {
                        "username": user.username,
                        "is_admin": user.is_staff # Helps React decide which dashboard to show
                    }
                })
            else:
                return JsonResponse({"status": "error", "message": "Invalid email or password"}, status=401)

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

class TaskView(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        
        # Check if the user is actually logged in
        if user.is_authenticated:
            # If yes, return only the tasks assigned to them
            return Task.objects.filter(assigned_to=user)
        
        # If no (AnonymousUser), return an empty list []
        # This prevents the "Field 'id' expected a number" crash
        return Task.objects.none()
    
@csrf_exempt
def who_am_i(request):
    return JsonResponse({
        "is_authenticated": request.user.is_authenticated,
        "username": request.user.username if request.user.is_authenticated else "Anonymous",
    })
