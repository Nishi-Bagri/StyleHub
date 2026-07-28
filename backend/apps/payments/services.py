import stripe

from django.conf import settings
from apps.orders.models import Order

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripePaymentService:

    @staticmethod
    def create_payment_intent(order : Order):

        amount = int(order.total_amount * 100)

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="inr",
            metadata={
                "order_id": order.id,
            }
        )

        return {
            "payment_intent_id": payment_intent.id,
            "client_secret": payment_intent.client_secret,
        }