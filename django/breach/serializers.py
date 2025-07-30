from rest_framework import serializers
from .models import *

class ExposedDataItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExposedDataItem
        fields = '__all__'

class ExposedDataCategorySerializer(serializers.ModelSerializer):
    items = ExposedDataItemSerializer(many=True, read_only=True)

    class Meta:
        model = ExposedDataCategory
        fields = '__all__'

class ExposedBreachSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExposedBreach
        fields = '__all__'

class BreachMetricIndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BreachMetricIndustry
        fields = '__all__'

class PasswordStrengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordStrength
        fields = '__all__'

class YearlyBreachStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearlyBreachStats
        fields = '__all__'

class BreachSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = BreachSummary
        fields = '__all__'

class EmailBreachRecordSerializer(serializers.ModelSerializer):
    exposed_data = ExposedDataCategorySerializer(many=True, read_only=True)
    exposed_breaches = ExposedBreachSerializer(many=True, read_only=True)

    class Meta:
        model = EmailBreachRecord
        fields = '__all__'
