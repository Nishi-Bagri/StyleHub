from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "order",
        "amount_paid",
        "payment_method",
        "payment_status",
        "stripe_payment_intent_id",
        "stripe_charge_id",
        "paid_at",
    )

    list_filter = (
        "payment_status",
        "payment_method",
    )

    search_fields = (
        "order__id",
        "stripe_payment_intent_id",
        "stripe_charge_id",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )