from django.urls import path
from .views import (
    AddToWishlistAPIView,
    WishlistAPIView,
    RemoveWishlistAPIView,
    WishlistStatusAPIView,
)

urlpatterns = [
    path(
        "add/<int:product_id>/",
        AddToWishlistAPIView.as_view(),
        name="wishlist-add",
    ),

    path(
        "",
        WishlistAPIView.as_view(),
        name="wishlist-list",
    ),

    path(
        "remove/<int:wishlist_id>/",
        RemoveWishlistAPIView.as_view(),
        name="wishlist-remove",
    ),

    path(
        "status/<int:product_id>/",
        WishlistStatusAPIView.as_view(),
        name="wishlist-status",
    ),
]