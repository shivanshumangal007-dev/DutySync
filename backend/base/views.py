from django.http import JsonResponse
from .models import Login
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
from rest_framework import generics
from .serializers import TaskSerializer
from .models import Task

@csrf_exempt
def login_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            email = data.get("email")
            password = data.get("password")

            obj = Login.objects.create(
                email=email,
                password=password
            )

            return JsonResponse({
                "status": "success",
                "message": "Data saved successfully"
            })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })

    return JsonResponse({"error": "Only POST allowed"})

class TaskView(generics.ListAPIView):
    
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(assigned_to=user)

