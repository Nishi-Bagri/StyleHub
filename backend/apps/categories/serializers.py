from django.utils.text import slugify
from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False)
    
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
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
                "Category name cannot be empty."
            )

        queryset = Category.objects.filter(name__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Category with this name already exists."
            )

        return value

    def validate_slug(self, value):
        value = value.strip().lower()

        queryset = Category.objects.filter(slug__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Category with this slug already exists."
            )

        return value

    def create(self, validated_data):
        if not validated_data.get("slug"):
            validated_data["slug"] = slugify(validated_data["name"])

        return super().create(validated_data)