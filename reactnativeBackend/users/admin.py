from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "phone", "otp_verified", "is_staff", "is_active", "date_joined")
    list_filter = ("is_staff", "is_active", "otp_verified")
    search_fields = ("username", "email", "phone")
    ordering = ("-date_joined",)