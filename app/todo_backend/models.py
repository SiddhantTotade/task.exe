from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, name, tc, password=None, password2=None):
        if not email:
            raise ValueError("Admin must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            tc=tc
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, tc, password=None):
        user = self.create_user(
            email,
            password=password,
            name=name,
            tc=tc,
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email Address",
        max_length=255,
        unique=True
    )

    name = models.CharField(max_length=200)
    tc = models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'tc']

    def __str__(self):
        return str(self.id)

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Todos(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=True, blank=True)
    priority = models.CharField(max_length=1, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    complete = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)
    completed = models.DateField(
        auto_now_add=False, default=None, null=True, blank=True)
    complete_before = models.DateTimeField(
        auto_now_add=False, default=None, null=True, blank=True)

    def __str__(self):
        return self.title
