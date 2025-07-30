from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Products
import django.contrib.auth.models as User
# Create your views here.
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get (self,request):
        user=request.user
        response={
            'username':user.username,
            'email':user.email or '',

        }
        return Response(response)
class ProductsView(APIView):
    permission_classes = [IsAuthenticated]    
    
    def get(self, request):
        products = Products.objects.all()
        response = {
            'products': [
                {
                    'name': product.name,
                    'description': product.description,
                    'price': str(product.price)
                } for product in products
            ]
        }
        return Response(response)


class Me(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user=User.objects.get(id=user.id)
        response = {
            'username': user.username,
            'email': user.email or '',
        }
        return Response(response, status=200)