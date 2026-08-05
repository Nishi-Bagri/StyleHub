import stripe

from decimal import Decimal
from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from apps.orders.models import Order
from apps.payments.models import (
    Payment,
    PaymentStatus,
    PaymentMethod,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


@method_decorator(csrf_exempt, name="dispatch")
class StripeWebhookView(View):

    def post(self, request):

        payload = request.body
        signature = request.headers.get("Stripe-Signature")

        try:
            event = stripe.Webhook.construct_event(
                payload=payload,
                sig_header=signature,
                secret=settings.STRIPE_WEBHOOK_SECRET,
            )

        except ValueError as e:
            print("Invalid Payload:", e)
            return HttpResponse(status=400)

        except stripe.error.SignatureVerificationError as e:
            print("Invalid Signature:", e)
            return HttpResponse(status=400)

        event_type = event["type"]

        print(f"Webhook Received: {event_type}")

        if event_type == "payment_intent.succeeded":

            payment_intent = event["data"]["object"]

            try:
                payment = Payment.objects.get(
                    stripe_payment_intent_id=payment_intent["id"]
                )

            except Payment.DoesNotExist:
                print("Payment record not found.")
                return HttpResponse(status=200)

            payment.payment_status = PaymentStatus.SUCCESS

            payment.payment_method = PaymentMethod.CARD

            payment.stripe_charge_id = payment_intent["latest_charge"]

            payment.amount_paid = (
                Decimal(payment_intent["amount"]) / Decimal("100")
            )

            payment.paid_at = timezone.now()

            payment.payment_method = PaymentMethod.CARD

            payment.save()

            order = payment.order

            order.status = Order.OrderStatus.PAID

            order.save()

            print(f"Payment Updated Successfully - Order #{order.id}")

        elif event_type == "payment_intent.payment_failed":

            payment_intent = event["data"]["object"]

            try:
                payment = Payment.objects.get(
                    stripe_payment_intent_id=payment_intent["id"]
                )

                payment.payment_status = PaymentStatus.FAILED

                payment.save()

                print(f"Payment Failed - Order #{payment.order.id}")

            except Payment.DoesNotExist:
                print("Payment record not found.")

        return HttpResponse(status=200)