# permissions.py
from rest_framework.permissions import BasePermission

class IsVerifiedUser(BasePermission):


    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            getattr(request.user, "is_verified", False)
        )
