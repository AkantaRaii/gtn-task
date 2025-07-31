from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Products
from .models import  User
from .serializers import *
from .permissions import *
from .emails import send_otp_via_email
# Create your views here.
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
    permission_classes = [IsVerifiedUser]

    def get(self, request):
        user = request.user
        user=User.objects.get(id=user.id)
        response = {
            'username': user.username,
            'email': user.email or '',
        }
        return Response(response, status=200)
    
class RegisterView(APIView):
    def post(self, request):
        try:
            data=request.data
            serializer=UserSerializers(data=data)
            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(serializer.data['email'])
                return Response({
                    'message':'registration successful',
                    'data;':serializer.data
                },status=status.HTTP_200_OK)
            return Response({
                'message':'Registration Failed',
                'errors':serializer.errors
            
            },status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
                'error':'something went wrong'
            },status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class VerifyOtp(APIView):
    def post(self,request):
        serializer=VerifyAccountSerializer(data=request.data)
        if serializer.is_valid():
            email=serializer.data['email']
            otp=serializer.data['otp']
            user=User.objects.filter(email=email)
            if not user.exists():
                return Response({
                'err':'user doesnt exists',
                'errors':serializer.errors
            
            },status=status.HTTP_400_BAD_REQUEST)

            if not user[0].otp==otp:
                return Response({
                    'error':'incorrect otp'
                
                },status=status.HTTP_400_BAD_REQUEST)
            else:
                user=user.first()
                user.is_verified=True
                user.save()
                return Response({
                    'message':'user Verified'
                },status=status.HTTP_201_CREATED)
