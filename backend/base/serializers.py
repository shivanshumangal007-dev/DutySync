from rest_framework import serializers
from .models import Task
from .models import Login
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TaskSerializer(serializers.ModelSerializer):

    assigned_to = UserSerializer(read_only=True) 
    class Meta:
        model = Task
        fields = "__all__"

class AllUsers(serializers.ModelSerializer):
    #userTasks = TaskSerializer(many=True, read_only=True, source='tasks')
    isAdmin = serializers.BooleanField(source='profile.isAdmin', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'isAdmin']