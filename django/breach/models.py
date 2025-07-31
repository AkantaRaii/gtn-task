from django.db import models
from users.models import User

# Create your models here.
class EmailBreachRecord(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    breach_risk_label = models.CharField(max_length=20, null=True, blank=True)
    breach_risk_score = models.IntegerField(null=True, blank=True)
    paste_count = models.IntegerField(default=0)
    last_paste_timestamp = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class BreachSummary(models.Model):
    email_record = models.ForeignKey(EmailBreachRecord, on_delete=models.CASCADE, related_name='breach_summaries')
    site = models.CharField(max_length=255)
class ExposedBreach(models.Model):
    email_record = models.ForeignKey(EmailBreachRecord, on_delete=models.CASCADE, related_name='exposed_breaches')
    breach = models.CharField(max_length=255)
    details = models.TextField()
    domain = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    logo = models.CharField(max_length=255, null=True, blank=True)
    password_risk = models.CharField(max_length=100)
    references = models.TextField(null=True, blank=True)
    searchable = models.CharField(max_length=10)
    verified = models.CharField(max_length=10)
    xposed_data = models.TextField()
    xposed_date = models.CharField(max_length=10)
    xposed_records = models.IntegerField()
class BreachMetricIndustry(models.Model):
    email_record = models.ForeignKey(EmailBreachRecord, on_delete=models.CASCADE, related_name='industries')
    industry_code = models.CharField(max_length=10)
    count = models.IntegerField()
class PasswordStrength(models.Model):
    email_record = models.ForeignKey(EmailBreachRecord, on_delete=models.CASCADE, related_name='password_strengths')
    easy_to_crack = models.IntegerField()
    plain_text = models.IntegerField()
    strong_hash = models.IntegerField()
    unknown = models.IntegerField()
class YearlyBreachStats(models.Model):
    email_record = models.ForeignKey(EmailBreachRecord, on_delete=models.CASCADE, related_name='yearly_stats')
    year = models.IntegerField()
    count = models.IntegerField()
class ExposedDataCategory(models.Model):
    email_record = models.ForeignKey(EmailBreachRecord, on_delete=models.CASCADE, related_name='exposed_data')
    level2_name = models.CharField(max_length=255)
class ExposedDataItem(models.Model):
    category = models.ForeignKey(ExposedDataCategory, on_delete=models.CASCADE, related_name='items')
    group = models.CharField(max_length=10)
    name = models.CharField(max_length=255)
    value = models.IntegerField()
