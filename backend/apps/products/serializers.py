from django.utils.text import slugify
from rest_framework import serializers

from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only = True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source = "category",
        write_only=True,
    )

    slug = serializers.SlugField(required=False)

    class Meta:
        model=Product
        fields = [
            "id",
            "name",
            "slug",
            "category",
            "category_id",
            "brand",
            "short_description",
            "description",
            "price",
            "stock",
            "image",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Product name can not be empty."
            )

        queryset = Product.objects.filter(name__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Product with this name already exists."
            )

        return value

    def validate_slug(self, value):
        value = value.strip().lower()

        queryset = Product.objects.filter(slug__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Product with this slug already exists."
            )

        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price must be greater than 0."
            )

        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Stock cannot be negative."
            )

        return value

    def create(self, validated_data):
        if not validated_data.get("slug"):
            validated_data["slug"] = slugify(
                validated_data["name"] 
            )

        return super().create(validated_data)