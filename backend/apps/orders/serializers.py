from rest_framework import serializers
from .models import Order, OrderItem

class PlaceOrderSerializer(serializers.Serializer):
    pass


class OrderHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            "id",
            "order_date",
            "status",
            "total_amount",
        )


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product_name",
            "price",
            "quantity",
        )

class OrderDetailSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = (
            "id",
            "order_date",
            "status",
            "total_amount",
            "order_items",
        )