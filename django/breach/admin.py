from django.contrib import admin
from .models import *

class ExposedDataItemInline(admin.TabularInline):
    model = ExposedDataItem
    extra = 0

class ExposedDataCategoryAdmin(admin.ModelAdmin):
    inlines = [ExposedDataItemInline]
    list_display = ('email_record', 'level2_name')

class ExposedBreachAdmin(admin.ModelAdmin):
    list_display = ('email_record', 'breach', 'industry', 'xposed_date', 'xposed_records')
    search_fields = ('breach', 'industry', 'domain')

class BreachSummaryAdmin(admin.ModelAdmin):
    list_display = ('email_record', 'site')

class BreachMetricIndustryAdmin(admin.ModelAdmin):
    list_display = ('email_record', 'industry_code', 'count')

class PasswordStrengthAdmin(admin.ModelAdmin):
    list_display = ('email_record', 'easy_to_crack', 'plain_text', 'strong_hash', 'unknown')

class YearlyBreachStatsAdmin(admin.ModelAdmin):
    list_display = ('email_record', 'year', 'count')
    list_filter = ('year',)

class EmailBreachRecordAdmin(admin.ModelAdmin):
    list_display = ('email', 'breach_risk_label', 'breach_risk_score', 'paste_count', 'last_paste_timestamp', 'created_at')
    search_fields = ('email',)
    list_filter = ('breach_risk_label',)

# Registering all models
admin.site.register(EmailBreachRecord, EmailBreachRecordAdmin)
admin.site.register(BreachSummary, BreachSummaryAdmin)
admin.site.register(ExposedBreach, ExposedBreachAdmin)
admin.site.register(BreachMetricIndustry, BreachMetricIndustryAdmin)
admin.site.register(PasswordStrength, PasswordStrengthAdmin)
admin.site.register(YearlyBreachStats, YearlyBreachStatsAdmin)
admin.site.register(ExposedDataCategory, ExposedDataCategoryAdmin)
