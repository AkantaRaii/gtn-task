from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Products
from .models import  User
from .serializers import *
from .permissions import *
from .task import send_otp_via_email
from django.utils import timezone
import jwt
from datetime import timedelta
from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView



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
                send_otp_via_email.delay(serializer.data['email'])
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
            user=User.objects.filter(email=email).first()
            if not user:
                return Response({
                'err':'user doesnt exists',
                'errors':serializer.errors
            
            },status=status.HTTP_400_BAD_REQUEST)
            if  (user.otp_expiry<timezone.now()):
                return Response({
                    'error':'otp expired'
                },status=status.HTTP_406_NOT_ACCEPTABLE)
            elif not user.otp==otp:
                return Response({
                    'error':'incorrect otp'
                
                },status=status.HTTP_400_BAD_REQUEST)
            else:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'user Verified'
                },status=status.HTTP_201_CREATED)
class SendOTP(APIView):
    def post(self, request):
        try:
            email=request.data.get('email')
            if (User.objects.filter(email=email).exists()):
                send_otp_via_email.delay(email)
                return Response({
                    'message':'opt successfully sent'
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    'error':'user doesnt exist'
                },status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'error':'something went wrong while sending OTP'
            },status=status.HTTP_400_BAD_REQUEST)
class OPTVerifyResetPassword(APIView):
    def post(self,request):
        try:
            serializer=VerifyAccountSerializer(data=request.data)
            if serializer.is_valid():
                try:
                    email=serializer.validated_data['email']
                    otp=serializer.validated_data['otp']

                    user=User.objects.get(email=email)
                except User.DoesNotExist:
                    return Response({
                        'error':'user doesnot exists'
                    },status=status.HTTP_400_BAD_REQUEST)
                if user.otp_expiry<timezone.now():
                    return Response({"error": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)
                if user.otp != otp:
                    return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
                temp_token=jwt.encode(
                    {'email':email,'exp':(timezone.now() +timedelta(minutes=5)).timestamp() },
                    settings.SECRET_KEY,
                    algorithm="HS256"   
                    
                )
                return Response({"message": "OTP verified", "temp_token": temp_token},status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({
                'error':'something went wrong while verifying otp'
            },status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # views.py

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        temp_token = serializer.validated_data['temp_token']
        new_password = serializer.validated_data['new_password']

        try:
            payload = jwt.decode(temp_token, settings.SECRET_KEY, algorithms=["HS256"])
            email = payload.get('email')
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Use Django's built-in method to set password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
    
# your_app/views.py


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
