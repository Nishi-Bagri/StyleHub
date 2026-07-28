from decimal import Decimal

from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView

from apps.cart.models import Cart, CartItem
from .models import Order, OrderItem
from .serializers import (
    PlaceOrderSerializer,
    OrderHistorySerializer,
    OrderDetailSerializer,
)


class PlaceOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        cart = get_object_or_404(
            Cart,
            user = request.user,
        )

        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items.exists():
            return Response(
                {
                    "message": "Your car is empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():

            order = Order.objects.create(
                user=request.user,
            )

            total_amount = Decimal("0.00")

            for cart_item in cart_items:
                OrderItem.objects.create(
                    order = order,
                    product=cart_item.product,
                    quantity = cart_item.quantity,
                    price=cart_item.product.price,
                )

                total_amount += (
                    cart_item.product.price * cart_item.quantity
                )

            order.total_amount = total_amount
            order.save()

            cart_items.delete()

        return Response(
            {
                "message": "Order placed successfully.",
                "order_id": order.id,
                "total_amount": str(order.total_amount),
            },
            status=status.HTTP_201_CREATED,
        )

class OrderHistoryAPIView(ListAPIView):
    serializer_class = OrderHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).order_by("-order_date")
    

class OrderDetailAPIView(RetrieveAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related(
            "order_items__product"
        )

class CancelOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):
        order = get_object_or_404(
            Order,
            id=order_id,
            user=request.user,
        )

        if order.status != Order.OrderStatus.PENDING:
            return Response(
                 {
                    "message": "Only pending orders can be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = Order.OrderStatus.CANCELLED
        order.save()

        return Response(
            {
                "message": "Order cancelled successfully.",
                "order_id": order.id,
                "status": order.status,
            },
            status=status.HTTP_200_OK,
        )