from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    LoginView,
    ProfileAPIView,
    ChangePasswordAPIView,
    LogoutView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("profile/", ProfileAPIView.as_view(), name="profile"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path(
        "change-password/",
        ChangePasswordAPIView.as_view(),
        name="change-password",
    ),
]