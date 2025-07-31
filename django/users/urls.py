from django.urls import path, include
from .views import *

urlpatterns=[
    
    path('products/',ProductsView.as_view(),name='products-view'),
    path('me/',Me.as_view(),name='me-view'),
    path('register/',RegisterView.as_view(),name='register'),
    path('verify/otp/',VerifyOtp.as_view())
]   