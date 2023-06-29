from .models import *
from .serializers import *
from .renderers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from datetime import date

# Create your views here.


# Generate access and refresh tokens for users
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }


# User registration view
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'msg': 'Admin registered successfully'}, status=status.HTTP_201_CREATED)


# User login view
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Login success'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_fields_errors': ['Email or Password is not valid']}}, status=status.HTTP_404_NOT_FOUND)


# User profile view
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# User change password view
class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={'user': request.user})

        serializer.is_valid(raise_exception=True)
        return Response({'data': 'Password changed successfully'}, status=status.HTTP_200_OK)


# User send password-reset link view
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserSendPasswordResetEmailSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password reset link has been sent on your e-mail'}, status=status.HTTP_200_OK)


# User password-reset view
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={'uid': uid, 'token': token})

        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password reset successfully'}, status=status.HTTP_200_OK)


class TodoView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        todo = reversed(Todos.objects.filter(user=request.user))

        if todo:
            todo_serializer = TodoSerializer(todo, many=True)
            return JsonResponse(todo_serializer.data, safe=False)
            # return Response({"data": todo_serializer.data}, status=status.HTTP_200_OK)
        return Response("", status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        todo_serialized_data = TodoSerializer(data=request.data)

        todo_serialized_data.is_valid(raise_exception=True)
        todo_serialized_data.save()

        return Response({"data": "Task Saved"}, status=status.HTTP_201_CREATED)

    def put(self, request):
        pass

    def patch(self, request, pk):
        if request.data['complete'] == "TRUE":
            today = date.today()
            Todos.objects.filter(pk=pk).update(
                complete=True, completed=today)
        else:
            todo = Todos.objects.get(pk=pk)
            update_serializer = TodoSerializer(
                todo, data=request.data, partial=True)

            update_serializer.is_valid(raise_exception=True)
            update_serializer.save()

        return Response({"data": "Task Updated"}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        Todos.objects.get(pk=pk).delete()
        return Response({"data": "Task Deleted"}, status=status.HTTP_200_OK)
