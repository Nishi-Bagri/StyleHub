from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.orders.models import Order
from apps.payments.models import (
    Payment,
    PaymentStatus,
)
from apps.payments.serializers import CreatePaymentIntentSerializer
from apps.payments.services import StripePaymentService


class CreatePaymentIntentView(APIView):

    def post(self, request):

        serializer = CreatePaymentIntentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = get_object_or_404(
            Order,
            id=serializer.validated_data["order_id"]
        )

        stripe_response = StripePaymentService.create_payment_intent(order)

        payment, created = Payment.objects.get_or_create(
            order=order,
            defaults={
                "amount_paid": order.total_amount,
                "payment_status": PaymentStatus.PENDING,
                "stripe_payment_intent_id": stripe_response["payment_intent_id"],
            },
        )

        if not created:
            payment.stripe_payment_intent_id = stripe_response["payment_intent_id"]
            payment.payment_status = PaymentStatus.PENDING
            payment.amount_paid = order.total_amount
            payment.save()

        return Response(
            {
                "client_secret": stripe_response["client_secret"],
                "payment_intent_id": stripe_response["payment_intent_id"],
            },
            status=status.HTTP_200_OK,
        )