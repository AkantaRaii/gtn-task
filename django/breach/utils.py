import requests
from .models import *

def fetch_and_store_breach_data(email):
    url = f"https://api.xposedornot.com/v1/breach-analytics?email={email}"
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": "API call failed"}

    data = response.json()

    # Use `or {}` to avoid NoneType errors
    breach_metrics = data.get('BreachMetrics') or {}
    risk_list = breach_metrics.get('risk') or [{}]
    risk_info = risk_list[0] if risk_list else {}

    pastes_summary = data.get('PastesSummary') or {}
    breaches_summary = data.get('BreachesSummary') or {}
    exposed_breaches = data.get('ExposedBreaches') or {}

    # Create base EmailBreachRecord
    record = EmailBreachRecord.objects.create(
        email=email,
        breach_risk_label=risk_info.get('risk_label'),
        breach_risk_score=risk_info.get('risk_score'),
        paste_count=pastes_summary.get('cnt'),
        last_paste_timestamp=pastes_summary.get('tmpstmp')
    )

    # Breach Summary
    BreachSummary.objects.create(
        email_record=record,
        site=breaches_summary.get('site')
    )

    # Exposed Breaches
    for breach in exposed_breaches.get('breaches_details', []):
        try:
            ExposedBreach.objects.create(
                email_record=record,
                breach=breach.get('breach'),
                details=breach.get('details'),
                domain=breach.get('domain'),
                industry=breach.get('industry'),
                logo=breach.get('logo'),
                password_risk=breach.get('password_risk'),
                references=breach.get('references'),
                searchable=breach.get('searchable'),
                verified=breach.get('verified'),
                xposed_data=breach.get('xposed_data'),
                xposed_date=breach.get('xposed_date'),
                xposed_records=breach.get('xposed_records')
            )
        except Exception as e:
            print(f"Error creating ExposedBreach: {e}")

    # Industry
    for industry_list in breach_metrics.get('industry', []):
        for industry_entry in industry_list:
            try:
                industry_code = industry_entry[0] if len(industry_entry) > 0 else None
                count = industry_entry[1] if len(industry_entry) > 1 else None
                BreachMetricIndustry.objects.create(
                    email_record=record,
                    industry_code=industry_code,
                    count=count
                )
            except Exception as e:
                print(f"Error creating BreachMetricIndustry: {e}")

    # Password Strength
    for ps in breach_metrics.get('passwords_strength', []):
        try:
            PasswordStrength.objects.create(
                email_record=record,
                easy_to_crack=ps.get('EasyToCrack'),
                plain_text=ps.get('PlainText'),
                strong_hash=ps.get('StrongHash'),
                unknown=ps.get('Unknown')
            )
        except Exception as e:
            print(f"Error creating PasswordStrength: {e}")

    # Year-wise stats
    for year_stat in breach_metrics.get('yearwise_details', []):
        for key, count in year_stat.items():
            try:
                year = int(key.lstrip("y")) if key else None
                YearlyBreachStats.objects.create(
                    email_record=record,
                    year=year,
                    count=count
                )
            except Exception as e:
                print(f"Error creating YearlyBreachStats: {e}")

    # Exposed Data Types
    for data_entry in breach_metrics.get('xposed_data', []):
        for level2 in data_entry.get('children', []):
            try:
                cat = ExposedDataCategory.objects.create(
                    email_record=record,
                    level2_name=level2.get('name')
                )
                for item in level2.get('children', []):
                    try:
                        ExposedDataItem.objects.create(
                            category=cat,
                            group=item.get('group'),
                            name=item.get('name'),
                            value=item.get('value')
                        )
                    except Exception as e:
                        print(f"Error creating ExposedDataItem: {e}")
            except Exception as e:
                print(f"Error creating ExposedDataCategory: {e}")

    return {"success": True, "email": record.email}
