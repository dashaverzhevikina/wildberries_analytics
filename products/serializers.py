from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    discount = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'discounted_price', 'rating', 'reviews_count', 'discount']
    
    def get_discount(self, obj):
        return obj.discount