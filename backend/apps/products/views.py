from rest_framework import generics, filters
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Product
from .serializers import ProductSerializer

from django_filters.rest_framework import DjangoFilterBackend

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter,
        filters.OrderingFilter,
        ]
    
    filterset_fields = [
        "category",
        "brand",
    ]

    search_fields = [
        "name",
        "short_description",
        "description",
    ]

    ordering_fields = [
        "name",
        "price",
        "stock",
        "created_at",
    ]


    def get_queryset(self):
        queryset = super().get_queryset().filter(is_active=True)

        # Price Filter
        max_price = self.request.query_params.get("max_price")
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # Availability Filter
        availability = self.request.query_params.get("availability")

        if availability == "in_stock":
            queryset = queryset.filter(stock__gt=0)

        elif availability == "out_of_stock":
            queryset = queryset.filter(stock=0)

        return queryset.order_by("name")

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]

        return[AllowAny()]

class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


    def get_queryset(self):
        queryset = super().get_queryset()

        if self.request.method == "GET":
            return queryset.filter(is_active=True)

        return queryset

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsAdminUser()]

        return [AllowAny()]

