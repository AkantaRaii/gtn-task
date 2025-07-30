from django.urls import path
from .views import CheckEmailBreachView

urlpatterns = [
    path('check-email-breach/', CheckEmailBreachView.as_view(), name='check-email-breach')
]
