from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login_api, name="login_api"),
    path('task/', views.TaskView.as_view()),
    path('whoami/', views.who_am_i),
    path('task/<int:pk>/update/', views.updateTaskStatus),
    path('logout/', views.logoutUser, name="logout"),
    path('admin_/newTask', views.newTask, name='newTask'),
]