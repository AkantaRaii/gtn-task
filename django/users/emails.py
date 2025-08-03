from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from .models import User
import random

def send_otp_via_email(email,expiry_minutes=2):
    print('Reached function')

    otp = random.randint(100000, 999999)

    subject = "Your One-Time Password (OTP) for Account Verification"
    message = f"""
Hello,

Your One-Time Password (OTP) for account verification is: {otp}

This OTP is valid for the next 5 minutes. Please do not share this code with anyone.

If you did not request this, please ignore this email.

Regards,
Your Company Team
    """

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False
        )
        print('Email sent successfully')
    except Exception as e:
        print(f"Error sending email: {e}")
        return False  # Or raise exception

    try:
        user = User.objects.get(email=email)
        user.otp = otp
        user.otp_expiry=timezone.now() +timedelta(minutes=expiry_minutes)
        user.save()
        print('OTP saved to user')
        return True
    except User.DoesNotExist:
        print("User with this email does not exist.")
        return False
