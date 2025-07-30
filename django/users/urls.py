from django.urls import path, include
from .views import *

urlpatterns=[
    path('me/',UserView.as_view(),name='user-view'),
    path('products/',ProductsView.as_view(),name='products-view'),
    path('me/',Me.as_view(),name='me-view'),
]   