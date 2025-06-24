import requests
from bs4 import BeautifulSoup
from products.models import Product

def parse_wildberries(search_query):
    url = f"https://www.wildberries.ru/catalog/0/search.aspx?search={search_query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        products = soup.find_all('div', class_='product-card__wrapper')
        
        for product in products:
            try:
                name = product.find('span', class_='product-card__name').text.strip()
                price = float(product.find('span', class_='price__lower-price').text.replace('₽', '').replace(' ', ''))
                old_price = product.find('del', class_='price__old-price')
                discounted_price = float(old_price.text.replace('₽', '').replace(' ', '')) if old_price else None
                rating = float(product.get('data-nm-rating', 0))
                reviews = int(product.get('data-nm-feedbacks', 0))
                
                Product.objects.create(
                    name=name,
                    price=price,
                    discounted_price=discounted_price,
                    rating=rating,
                    reviews_count=reviews
                )
            except Exception as e:
                print(f"Ошибка при обработке товара: {e}")
                continue
                
    except Exception as e:
        print(f"Ошибка при парсинге: {e}")