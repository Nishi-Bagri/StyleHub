from django.shortcuts import get_object_or_404

from rest_framework import status 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.models import Product
from .models import Cart, CartItem
from .serializers import AddToCartSerializer, CartItemSerializer, UpdateCartItemSerializer


class AddToCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]

        product = get_object_or_404(
            Product,
            id=product_id
        )

        cart, _ = Cart.objects.get_or_create(
            user=request.user
        )

        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": 1},
        )

        if not item_created:
            cart_item.quantity += 1
            cart_item.save()

        return Response(
            {
                "message": "Product added to cart successfully.",
                "product_id": product.id,
                "quantity": cart_item.quantity,
            },
            status=status.HTTP_200_OK,
        )

class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)

        cart_items = CartItem.objects.filter(
            cart=cart
        ).select_related("product")

        serializer = CartItemSerializer(cart_items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateCartItemAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, cart_item_id):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart_item = get_object_or_404(
            CartItem,
            id=cart_item_id,
            cart__user=request.user,
        )

        cart_item.quantity = serializer.validated_data["quantity"]
        cart_item.save()

        return Response(
            {"message": "Quantity updated successfully."},
            status=status.HTTP_200_OK,
        )

class RemoveCartItemAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_item_id):
        cart_item = get_object_or_404(
            CartItem,
            id=cart_item_id,
            cart__user=request.user,
        )

        cart_item.delete()

        return Response(
            {"message": "Item removed succeddfully."},
            status=status.HTTP_200_OK,
        )