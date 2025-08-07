from rest_framework.throttling import AnonRateThrottle,UserRateThrottle
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import *
from .models import EmailBreachRecord
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsVerifiedUser
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
class CustomUserThrottle(UserRateThrottle):
    rate='20/m'
class CheckEmailBreachView(APIView):
    permission_classes=[IsVerifiedUser]

    def get(self, request): # yo mehtod le user ko associated email ko breach pahtau xa not other
        user = request.user
        email=user.email
        if not email:
            return Response({"error": " Assocated Email is not found"}, status=400)


        # Fetch and store only if it doesn't already exist
        fetch_and_store_breach_data(email,user=user)
        record = EmailBreachRecord.objects.filter(email=email,user=user).first()
        if not record:
            return Response({"Message": "No breach data found for this email."}, status=404)

        serialized = EmailBreachRecordSerializer(record)
        Yearly_stat_record=YearlyBreachStats.objects.filter(email_record=record)
        serialized_yearly_stat=YearlyBreachStatsSerializer(Yearly_stat_record,many=True)
        return Response({'email_record':serialized.data,
                         'yearly_stat':serialized_yearly_stat.data},status=status.HTTP_200_OK)


class MonitoredEmailBreachsView(APIView):
    permission_classes=[IsVerifiedUser]
    throttle_classes=[CustomUserThrottle]
    def post(self,request):
        user=request.user
        email = request.data.get("email")
        if not email:
            return Response({'error':'email is required'}, status=status.HTTP_400_BAD_REQUEST)
        record=EmailBreachRecord.objects.filter(email=email,user=user)
        if not record:
            fetch_and_store_breach_data(email,user=user)
            return Response(
                {
                    'message':'email added sucessfully',
                },
                status=status.HTTP_201_CREATED
            )
        return Response({
            'message':'email already exists'
        },
        status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request):
        user=request.user
        records=EmailBreachRecord.objects.filter(user=user)
        if not records:
            
            return Response({
                'message':'monitored emails not found',
            },status=status.HTTP_204_NO_CONTENT)
        emails=[]
        for record in records:
            emails.append(record.email)
            try:
                fetch_and_store_breach_data(record.email,user=user) #updates the data
            except :
                pass
        response=[]
        updated_records=EmailBreachRecord.objects.filter(user=user)

        for updated_record in updated_records:
            serialized_email_breach = EmailBreachRecordSerializer(updated_record)
            year_record = YearlyBreachStats.objects.filter(email_record=updated_record)
            serialized_yearly_breach = YearlyBreachStatsSerializer(year_record, many=True)  # <== add `many=True` if it's a queryset

            response.append({
                "email_breach": serialized_email_breach.data,
                "yearly_stats": serialized_yearly_breach.data
            })

        return Response({
            "noOfMonitoredEmails":len(emails),
            "MonitoredEmailBreach":response
        },status=status.HTTP_200_OK)

    def delete(self,request):
        try:
            user=request.user
            email=request.data.get('email')
            if not email:
                return Response({
                        'error':'email is reqiired'
                        },status=status.HTTP_400_BAD_REQUEST)
            record=EmailBreachRecord.objects.get(email=email,user=user)
            record.delete()
            return Response({'message': 'Email deleted successfully'}, status=status.HTTP_200_OK)
        except EmailBreachRecord.DoesNotExist:
            return Response({
                'error':'email not found for this user'
            },status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
             return Response({'error': 'Something went wrong', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class ThrottleCheck(APIView):
    def get(self, request):
        ip=request.META.get('HTTP_X_FORWARDED_FOR')
        if not ip:
            ip=request.META.get('REMOTE_ADDR')
        return Response({'message':'hi'+ip+' from server'})
    
class BreachReportDownloadView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure user is logged in

    def get(self, request):
        user = request.user
        email_record = EmailBreachRecord.objects.filter(user=user).first()

        buffer = create_breach_report_pdf(user, email_record)

        response = HttpResponse(
            buffer.read(),
            content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        response['Content-Disposition'] = f'attachment; filename="report_{user.username}.docx"'
        return response
