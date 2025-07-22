import django.contrib.auth
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenObtainPairSerializer,
)
from core_apps.accounts.models import User, Settings


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = "__all__"


class UserCreateSerializer(serializers.ModelSerializer):
    settings = SettingsSerializer(required=False)
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password", "placeholder": "Password"},
        validators=[validate_password],
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password", "placeholder": "Password"},
    )

    class Meta:
        model = django.contrib.auth.get_user_model()
        fields = [
            "id",
            "nickname",
            "username",
            "email",
            "password",
            "password2",
            "settings",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        settings_data = validated_data.pop("settings", None)
        validated_data["password"] = make_password(validated_data.pop("password2"))
        if not settings_data:
            settings_data = {}
        validated_data["settings"] = Settings.objects.create(**settings_data)
        return super(UserCreateSerializer, self).create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    settings = SettingsSerializer(required=False)
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "nickname",
            "first_name",
            "last_name",
            "email",
            "username",
            "email",
            "settings",
        ]

    def update(self, instance, validated_data):
        settings_data = validated_data.pop("settings", None)
        instance = super().update(instance, validated_data)
        if settings_data:
            instance.settings = SettingsSerializer().update(
                instance.settings, settings_data
            )
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("old_password", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                {"old_password": "Old password is not correct"}
            )
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance


class ChangeUserToAdmin(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_staff", "is_superuser"]


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh_token = attrs["refresh"]
        token = RefreshToken(refresh_token)

        try:
            user = User.objects.get(id=token["user_id"])
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")

        # Додаємо додаткову інформацію
        data = {
            "token": data,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "nickname": user.nickname,
                "settings": SettingsSerializer(user.settings).data,
                # інші потрібні поля
            },
        }

        return data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Додаткові дані про користувача
        user = self.user

        data = {
            "token": data,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "nickname": user.nickname,
                "settings": SettingsSerializer(user.settings).data,
                # інші потрібні поля
            },
        }

        return data
