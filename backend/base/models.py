from django.db import models

class Login(models.Model):
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

# Create your models here.
