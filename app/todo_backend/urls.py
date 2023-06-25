from django.urls import path
from .views import *

urlpatterns = [
    # Authentication URLs
    path('login/', UserLoginView.as_view(), name='login'), # Existing User Login 
    path('register/', UserRegistrationView.as_view(), name='register'), # New User Registration
    path('profile/', UserProfileView.as_view(), name='profile'), # Get User Profile
    path('change-password/', UserChangePasswordView.as_view(), # Change User Password / Forget Password
         name='change_password'),
    path('reset-password/', SendPasswordResetEmailView.as_view(), # Send Email for Resetting Password / Forgot Password
         name='send_reset_email_password'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), # Enter New User Password / Forgot Password
         name='reset_password'),

    
    path('todo/', TodoView.as_view(), name='get_todo'), # Get All Tasks w.r.t User
]
