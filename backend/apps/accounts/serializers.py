from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


from .models import User

import re

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "confirm_password",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "gender",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            **validated_data
        )

        return user

    def validate_username(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Username must be at least 3 characters."
            )

        if len(value) > 30:
            raise serializers.ValidationError(
                "Username cannot exceed 30 characters."
            )

        if not re.fullmatch(r"[A-Za-z0-9_]+", value):
            raise serializers.ValidationError(
                "Username can contain only letters, numbers, and underscore (_)."
            )

        return value
    
    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )
        
        return value
    
    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        
        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter. "
            )
        
        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError(
                "Password must contain at least one lowercase letter."
            )
        
        if not re.search(r"\d", value):
            raise serializers.ValidationError(
                "Password must contain atleast one number."
            )
        
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-+=/\\[\]`~;']", value):
            raise serializers.ValidationError(
                "Password must contain at least one special character."
            )

        return value
    
    def validate_phone_number(self, value):
        value = value.strip()

        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )

        if len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be exactly 10 digits."
            )

        queryset = User.objects.filter(phone_number=value)


        if self.instance:
            queryset = queryset.exclude(id=self.instance.id)

        if queryset.exists():
            raise serializers.ValidationError(
                "A user with this phone number already exists."
            )

        return value

    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username = data["username"],
            password = data["password"]
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid username or password."
            )
        
        data["user"] = user
        return data
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "gender",
            "address",
            "profile_image",
        ] 

        read_only_fields = [
            "username",
            "email",
        ]

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):

        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password":"password do not match"
                }
            )

        try:
            validate_password(attrs["new_password"])
        except DjangoValidationError as e:
            raise serializers.ValidationError(
                {
                    "new_password": e.messages
                }
            )

        return attrs


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def save(self, **kwargs):
        refresh_token = self.validated_data["refresh"]

        try:
            RefreshToken(refresh_token).blacklist()
        except TokenError:
            raise serializers.ValidationError({
                "refresh": "Invalid or expired refresh token."
            })