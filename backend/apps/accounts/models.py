from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)

    class Gender(models.TextChoices):
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"
        OTHER = "Other", "Other"
        PREFER_NOT_TO_SAY = "Prefer Not To Say", "Prefer Not To Say"

    phone_number = models.CharField(
        max_length=10,
        unique=True,
    )

    gender = models.CharField(
        max_length=20,
        choices=Gender.choices,
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username