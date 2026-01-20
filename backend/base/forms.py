from .models import Login
from django.forms import ModelForm

class  ProductForm(ModelForm):
    class Meta:
        model = Login
        fields = "__all__" 