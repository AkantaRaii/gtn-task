from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import fetch_and_store_breach_data
from .models import EmailBreachRecord
from .serializers import EmailBreachRecordSerializer
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsVerifiedUser
class CheckEmailBreachView(APIView):
    permission_classes=[IsVerifiedUser]
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=400)

        # Try to find the record
        record = EmailBreachRecord.objects.filter(email=email).first()

        if not record:
            # Fetch and store only if it doesn't already exist
            fetch_and_store_breach_data(email)
            record = EmailBreachRecord.objects.filter(email=email).first()

            if not record:
                print("keiu xaina")
                return Response({"Message": "No breach data found for this email."}, status=404)

        serialized = EmailBreachRecordSerializer(record)
        return Response(serialized.data)
