from django.urls import path
from .webhooks import StripeWebhookView

from apps.payments.views import CreatePaymentIntentView

urlpatterns = [
    path(
        "create-intent/",
        CreatePaymentIntentView.as_view(), name="create-payment-intent",),
        
    path("webhook/", StripeWebhookView.as_view(), name="stripe-webhook"),
]