from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(),
         name='change_password'),
    path('reset-password/', SendPasswordResetEmailView.as_view(),
         name='send_reset_email_password'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(),
         name='reset_password'),
]
