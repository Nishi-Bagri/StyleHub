from django.urls import path
from . views import (
    AddToCartAPIView,
    CartAPIView,
    UpdateCartItemAPIView,
    RemoveCartItemAPIView,
)


urlpatterns = [
    path("add/", AddToCartAPIView.as_view(), name="add-to-cart"),
    path("", CartAPIView.as_view(), name="cart"),
    path("update/<int:cart_item_id>/", UpdateCartItemAPIView.as_view(), name="update-cart"),
    path("remove/<int:cart_item_id>/", RemoveCartItemAPIView.as_view(), name="remove-cart"),
]
