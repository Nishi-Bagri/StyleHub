from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.models import Product
from .models import Wishlist
from .serializers import WishlistSerializer


class AddToWishlistAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        product = get_object_or_404(
            Product,
            id = product_id,
        )

        wishlist_item, created = Wishlist.objects.get_or_create(
            user=request.user,
            product=product,
        )

        if created:
            return Response(
                {
                    "message":"Product added to wishlist successfully.",
                    "wishlist_id": wishlist_item.id,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "message":"Product is already in your wishlist.",
            },
            status=status.HTTP_200_OK,
        )

class WishlistAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist_items = Wishlist.objects.filter(
            user=request.user
        ).select_related("product")

        serializer = WishlistSerializer(
            wishlist_items,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class RemoveWishlistAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, wishlist_id):
        wishlist_item = get_object_or_404(
            Wishlist,
            id=wishlist_id,
            user=request.user,
        )

        wishlist_item.delete()

        return Response(
            {
                "message": "Product removed from wishlist successfully.",
            },
            status=status.HTTP_200_OK,
        )

class WishlistStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        wishlist_item = Wishlist.objects.filter(
            user=request.user,
            product_id=product_id,
        ).first()

        return Response(
            {
                "is_in_wishlist": wishlist_item is not None,
                "wishlist_id": wishlist_item.id if wishlist_item else None,
            },
            status=status.HTTP_200_OK,
        )