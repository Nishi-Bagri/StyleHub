from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "gender",
        "is_staff",
        "is_active",
    )

    search_fields = (
        "username",
        "email",
        "phone_number",
    )

    list_filter = (
        "gender",
        "is_staff",
        "is_active",
    )

    ordering = ("id",)

    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Information",
            {
                "fields": (
                    "phone_number",
                    "gender",
                    "profile_image",
                ),
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "Additional Information",
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "phone_number",
                    "gender",
                    "profile_image",
                ),
            },
        ),
    )
