from rest_framework import serializers
from .models import Cart, CartItem


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(
        min_value=1,
        required=True
    )

    quantity = serializers.IntegerField(
        min_value=1,
        default=1
    )


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    brand = serializers.CharField(
        source="product.brand",
        read_only=True
    )

    image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    stock = serializers.IntegerField(
        source="product.stock",
        read_only=True
    )

    class Meta:
        model = CartItem
        fields = (
            "id",
            "product_name",
            "brand",
            "image",
            "price",
            "stock",
            "quantity",
        )


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(
        min_value=1
    )