from django.urls import path
from .views import *

urlpatterns = [
    path('check-email-breach/', CheckEmailBreachView.as_view(), name='check-email-breach'),
    path('monitoredemail/',MonitoredEmailBreachsView.as_view()),
    path('throttle/',ThrottleCheck.as_view()),

]
