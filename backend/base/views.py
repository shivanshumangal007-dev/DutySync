from django.http import JsonResponse
from .models import Login, Profile
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from .serializers import TaskSerializer, AllUsers
from .models import Task
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes# Add this import
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from django.db.models import Count


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return
    

    
@csrf_exempt
def newTask(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            title = data.get("title")
            description = data.get("description")
            assignee_name = data.get("assigned_to")
            due_date = data.get("due_date")
            priority = data.get("priority")
            user_instance = User.objects.get(username=assignee_name)
            obj = Task.objects.create(
                title = title,
                description = description,
                assigned_to = user_instance,
                due_date = due_date,
                priority = priority,
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
            isAdmin = getattr(user.profile, 'isAdmin', False) if user.is_authenticated else False

            if user is not None:
                # 2. Start the session (this logs them in)
                login(request, user)
                
                # 3. Send back details so React knows their role
                return JsonResponse({
                    "status": "success",
                    "message": "Login successful",
                    "userDetails": {
                        "username": user.username,
                        "isAdmin": isAdmin # Helps React decide which dashboard to show
                    }
                })
            else:
                return JsonResponse({"status": "error", "message": "Invalid email or password"}, status=401)

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

class TaskView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Task.objects.none()

        # 1. Define the cutoff (20 seconds ago)
        cutoff_date = timezone.now() - timedelta(days=15)

        Task.objects.filter(
            assigned_to=user,
            status='COMPLETED',
            completed_at__lte=cutoff_date, # Use 'less than or equal'
            hidden=False
        ).update(hidden=True, status="REMOVED")

        return Task.objects.filter(assigned_to=user).select_related("assigned_to")
        

    def list(self, request, *args, **kwargs):
        # 1. Get the original task list data
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # 2. Calculate the stats (only if user is logged in)
        user = request.user
        isAdmin = getattr(user.profile, 'isAdmin', False) if user.is_authenticated else False
        if isAdmin:
            queryset2 = User.objects.prefetch_related(
                'tasks__assigned_to'
            ).select_related('profile')
            serializer2 = AllUsers(queryset2, many=True)
        stats = {
            "completed": 0,
            "pending": 0,
            "inProgress": 0
        }

        userDetails = {
            "username": user.username,
            "email": user.email,
            'isAdmin': isAdmin
        }
        
        if user.is_authenticated:
            stats_qs = queryset.values("status").annotate(count=Count("id"))
            stats = {
                "completed": 0,
                "pending": 0,
                "inProgress": 0,
            }

            for item in stats_qs:
                if item["status"] == "COMPLETED":
                    stats["completed"] = item["count"]
                elif item["status"] == "PENDING":
                    stats["pending"] = item["count"]
                elif item["status"] == "IN_PROGRESS":
                    stats["inProgress"] = item["count"]

        # 3. Combine everything into one response

        if isAdmin:
            return Response({
                "tasks": serializer.data,
                "stats": stats,
                "userDetails":userDetails,
                "AllUsers":serializer2.data
            })
        else:
            return Response({
                "tasks": serializer.data,
                "stats": stats,
                "userDetails":userDetails,
            })
        

@api_view(['PATCH'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def updateTaskStatus(request, pk):

    task = get_object_or_404(Task, id = pk, assigned_to=request.user)
    newStatus = request.data.get("status")

    if newStatus:
        task.status = newStatus

        if newStatus == "COMPLETED":
            task.completed_at = timezone.now()
        else:
            task.completed_at = None
        task.save()

        return Response({"message": f"Task {pk} is now {newStatus}"})
    return Response({"error": "No status provided"}, status=400)


@csrf_exempt
def logoutUser(request):
    logout(request)
    return JsonResponse({
        "status": "success",
        "message": "Logged out successfully"
    })

@csrf_exempt
def who_am_i(request):
    return JsonResponse({
        "is_authenticated": request.user.is_authenticated,
        "username": request.user.username if request.user.is_authenticated else "Anonymous",
    })
