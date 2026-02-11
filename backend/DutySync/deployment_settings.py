import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR


# -------------------------
# SECURITY
# -------------------------


DEBUG = True

SECRET_KEY = os.environ.get("SECRET_KEY", "unsafe-dev-secret")

RENDER_HOST = os.environ.get("RENDER_EXTERNAL_HOSTNAME")

ALLOWED_HOSTS = [
    "*"
]

CSRF_TRUSTED_ORIGINS = [
    "https://dutysync.onrender.com",
    "https://dutysyncreact.onrender.com",
]

# -------------------------
# STATIC FILES (Render)
# -------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# -------------------------
# MIDDLEWARE
# -------------------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# CORS_ALLOWED_ORIGINS = [
#     'https://dutysyncreact.onrender.com'
# ]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173", # Or whatever port your frontend is on
    "http://127.0.0.1:5173",
    "https://dutysyncreact.onrender.com",
]

STATIC_URL = "static/"

CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_HTTPONLY = False

SESSION_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_DOMAIN = ".onrender.com"
CSRF_COOKIE_DOMAIN = ".onrender.com"

CSRF_COOKIE_SAMESITE = "None"
CSRF_COOKIE_SECURE = True

DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get("DATABASE_URL"),
        conn_max_age=600,
        ssl_require=True,
    )
}