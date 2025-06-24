from django.contrib import admin
from django.urls import path, include  # Исправлен импорт
from django.views.generic import RedirectView  # Исправлено Generic -> generic

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
    path('', RedirectView.as_view(url='/api/products/')),  # Редирект на API
]