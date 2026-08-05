from rest_framework import serializers
from .models import Order, OrderItem

class PlaceOrderSerializer(serializers.Serializer):
    shipping_name = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=15)
    shipping_address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    pincode = serializers.CharField(max_length=10)


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True,
    )

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product_name",
            "product_image",
            "price",
            "quantity",
        )

class OrderHistorySerializer(serializers.ModelSerializer):
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