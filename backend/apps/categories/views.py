from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny

from .models import Category
from .serializers import CategorySerializer


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(
            is_active=True
        ).order_by("name")

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]

        return [AllowAny()]
    
class CategoryRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.request.method == "GET":
            return queryset.filter(is_active=True)

        return queryset

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsAdminUser()]

        return [AllowAny()]
    