from django.contrib import admin
from .models import CartItem, Cart

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "created_at",
        "updated_at"
    )

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "cart",
        "product",
        "quantity",
        "created_at",
    )
    search_fields = (
        "cart__user__email",
        "product__name",
    )
    list_filter = ("created_at",)
    ordering = ("-created_at",)