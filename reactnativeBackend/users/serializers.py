from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "phone", "otp_verified", "first_name", "last_name")


class FirebaseAuthSerializer(serializers.Serializer):
    """
    Expect: {"id_token": "<firebase-id-token>"}
    Backend verifies Firebase token and returns (or creates) user.
    """
    id_token = serializers.CharField()