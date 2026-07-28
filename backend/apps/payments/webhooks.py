import stripe

from django.utils import timezone
from decimal import Decimal

from django.conf import settings
from django.http import HttpResponse
from django.views import View

from apps.orders.models import Order
from apps.payments.models import Payment, PaymentStatus

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


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
            print("ValueError:", e)
            return HttpResponse(status=400)

        except stripe.error.SignatureVerificationError as e:
            print("Signature Error:", e)
            return HttpResponse(status=400)

        event_type = event["type"]

        if event_type == "payment_intent.succeeded":

            payment_intent = event["data"]["object"]

            try:
                payment = Payment.objects.get(
                    stripe_payment_intent_id=payment_intent["id"]
                )

            except Payment.DoesNotExist:
                return HttpResponse(status=200)

            payment.payment_status = PaymentStatus.SUCCESS
            payment.stripe_charge_id = payment_intent["latest_charge"]
            payment.amount_paid = Decimal(payment_intent["amount"]) / Decimal("100")
            payment.paid_at = timezone.now()
            payment.save()

            order = payment.order
            order.status = Order.OrderStatus.PAID
            order.save()

        return HttpResponse(status=200)

    