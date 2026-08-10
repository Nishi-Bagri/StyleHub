from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.utils import timezone

from apps.orders.models import Order
from apps.payments.models import (
    Payment,
    PaymentStatus,
)

from apps.payments.serializers import (
    CreatePaymentIntentSerializer,
    ConfirmPaymentSerializer,
)

from apps.payments.services import StripePaymentService


class CreatePaymentIntentView(APIView):

    def post(self, request):

        serializer = CreatePaymentIntentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = get_object_or_404(
            Order,
            id=serializer.validated_data["order_id"],
            user=request.user,
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

class ConfirmPaymentView(APIView):

    def post(self, request):

        serializer = ConfirmPaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payment_intent_id = serializer.validated_data[
            "payment_intent_id"
        ]

        payment_intent = StripePaymentService.retrieve_payment_intent(
            payment_intent_id
        )

        if payment_intent.status != "succeeded":
            return Response(
                {
                    "message": "Payment has not been completed."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order_id = payment_intent.metadata["order_id"]

        if not order_id:
            return Response(
                {
                    "message": "Order information not found."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = get_object_or_404(
            Order,
            id=order_id,
            user=request.user,
        )

        payment = get_object_or_404(
            Payment,
            order=order,
        )

        payment.payment_status = PaymentStatus.SUCCESS
        payment.payment_method = "CARD"
        payment.amount_paid = order.total_amount
        payment.paid_at = timezone.now()

        payment.save()

        order.status = Order.OrderStatus.PAID

        order.save()

        return Response(
            {
                "message": "Payment confirmed successfully.",
                "order_id": order.id,
                "payment_id": payment_intent.id,
                "amount": order.total_amount,
            },
            status=status.HTTP_200_OK,
        )

