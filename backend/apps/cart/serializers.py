from rest_framework import serializers
from .models import Cart, CartItem

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(
        min_value = 1,
        required = True,
        help_text = "ID of the product to add to the cart."
    )

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    price = serializers.DecimalField(
        source = "product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = CartItem
        fields = (
            "id",
            "product_name",
            "price",
            "quantity",
        )

class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1)