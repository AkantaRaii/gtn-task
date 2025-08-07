from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email",'password','is_verified']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user=User(username=validated_data['username'],
        email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class VerifyAccountSerializer(serializers.Serializer):
    email=serializers.EmailField()
    otp=serializers.CharField()
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)  # optional: set length for OTP
    password = serializers.CharField(write_only=True, min_length=8)
    # serializers.py
class ResetPasswordSerializer(serializers.Serializer):
    temp_token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)
# your_app/serializers.py


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['username'] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Optional: Add more user info to the response
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'username': self.user.username,
        }

        return data
