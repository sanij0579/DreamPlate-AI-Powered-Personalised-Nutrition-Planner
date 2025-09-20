from rest_framework import status, views
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import FirebaseAuthSerializer, UserSerializer
from django.conf import settings

# We will use google.oauth2.id_token and google.auth.transport.requests to verify Firebase token
# install: pip install google-auth
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

User = get_user_model()

class FirebaseLoginView(views.APIView):
    """
    Mobile posts Firebase ID token. We verify it, then create/get local user.
    Returns user data and a JWT token (optionally SimpleJWT).
    """
    permission_classes = []

    def post(self, request):
        serializer = FirebaseAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        id_token_str = serializer.validated_data["id_token"]

        try:
            # Verify token with Firebase project audience (YOUR_FIREBASE_PROJECT_ID)
            # If you use google-service-account, issued_to check is done automatically.
            decoded = id_token.verify_firebase_token(id_token_str, google_requests.Request())
            # decoded contains: uid, email, name, picture, phone_number (maybe)
        except Exception as e:
            return Response({"detail": "Invalid token", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        uid = decoded.get("uid")
        email = decoded.get("email")
        phone = decoded.get("phone_number")
        name = decoded.get("name") or (decoded.get("email") or "").split("@")[0]

        user, created = User.objects.get_or_create(username=uid, defaults={
            "email": email or "",
            "phone": phone or "",
            "first_name": name.split(" ")[0] if name else "",
            "last_name": " ".join(name.split(" ")[1:]) if name and len(name.split(" "))>1 else "",
            "otp_verified": True
        })
        if not user.otp_verified:
            user.otp_verified = True
            user.save()

        # Optionally issue JWT using SimpleJWT
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)

        data = {
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return Response(data)