from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "is_active",
    )

    search_fields = (
        "name",
        "description",
    )

    list_filter = (
        "category",
        "is_active",
    )

    ordering = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    # NEW FEATURES
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
                "name",
                "slug",
                "description",
            )
        }),
        ("Pricing & Inventory", {
            "fields": (
                "price",
                "stock_quantity",
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