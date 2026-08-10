from django.db import models
from apps.orders.models import Order

class PaymentStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    SUCCESS = "SUCCESS", "Success"
    FAILED = "FAILED", "Failed"


class PaymentMethod(models.TextChoices):
    NOT_SELECTED = "NOT_SELECTED", "Not Selected"
    UPI = "UPI", "UPI"
    CARD = "CARD", "Card"
    NET_BANKING = "NET_BANKING", "Net Banking"


class Payment(models.Model):

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="payment"
    )

    amount_paid = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.PENDING,
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.NOT_SELECTED,
    )

    stripe_payment_intent_id = models.CharField(
        max_length=255,
        unique=True,
        blank=True,
        null=True,
    )

    stripe_charge_id = models.CharField(
        max_length=255,
        unique=True,
        blank=True,
        null=True,
    )

    paid_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.order.id} - {self.payment_status}"