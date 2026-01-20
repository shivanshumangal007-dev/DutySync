from django.http import JsonResponse
from .models import Login
from django.views.decorators.csrf import csrf_exempt
import json

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