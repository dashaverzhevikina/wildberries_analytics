from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название товара")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Цена со скидкой")
    rating = models.FloatField(verbose_name="Рейтинг")
    reviews_count = models.IntegerField(verbose_name="Количество отзывов")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def discount(self):
        if self.discounted_price:
            return round((self.price - self.discounted_price) / self.price * 100, 2)
        return 0

    def __str__(self):
        return self.name