from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "brand",
        "price",
        "is_active",
    )

    search_fields = (
        "name",
        "brand",
        "description",
    )

    list_filter = (
        "category",
        "brand",
        "is_active",
    )

    ordering = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    list_editable = (
        "price",
        "is_active",
    )

    list_display_links = (
        "name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        ("Basic Information", {
            "fields": (
                "category",
                "brand",
                "name",
                "slug",
                "description",
            )
        }),
        ("Pricing & Inventory", {
            "fields": (
                "price",
                "stock",
                "short_description",
            )
        }),
        ("Media", {
            "fields": (
                "image",
            )
        }),
        ("Status", {
            "fields": (
                "is_active",
            )
        }),
        ("Timestamps", {
            "fields": (
                "created_at",
                "updated_at",
            )
        }),
    )