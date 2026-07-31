from rest_framework import serializers
from .models import Order, OrderItem

class PlaceOrderSerializer(serializers.Serializer):
    shipping_name = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=15)
    shipping_address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    pincode = serializers.CharField(max_length=10)


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