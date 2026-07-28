from django.urls import path
from .views import (
    PlaceOrderAPIView,
    OrderHistoryAPIView,
    OrderDetailAPIView,
    CancelOrderAPIView,
    )

urlpatterns = [
    path("place/", PlaceOrderAPIView.as_view(), name="place-order"),
    path("history/",OrderHistoryAPIView.as_view(), name="order-history"),
    path("<int:pk>/",OrderDetailAPIView.as_view(),name="order-detail"),
    path("<int:order_id>/cancel/", CancelOrderAPIView.as_view(),name="cancel-order"),
]