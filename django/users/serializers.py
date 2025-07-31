from rest_framework import serializers
from .models import User
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