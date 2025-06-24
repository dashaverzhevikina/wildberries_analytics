# Wildberries Analytics

### Backend (Django)
- `products/` - основное приложение
  - `models.py` - модель данных товаров
  - `views.py` - API эндпоинты
  - `parsers/` - парсер Wildberries
  - `urls.py` - маршруты API
- `wildberries_analytics/` - настройки проекта
  - `settings.py` - основные настройки
  - `urls.py` - корневые маршруты

### Frontend (React)
- `src/components/`
  - `ProductTable.js` - главная таблица с фильтрами
  - `PriceHistogram.js` - гистограмма цен
  - `DiscountRatingChart.js` - график скидок
- `public/` - статические файлы

### Требования
- Python 3.8+
- Node.js 16+
- PostgreSQL (опционально)

### Backend
1. Установите зависимости:
```bash
pip install -r requirements.txt
```

2. Настройте БД (SQLite по умолчанию):
```bash
python manage.py migrate
```

3. Создайте суперпользователя:
```bash
python manage.py createsuperuser
```

4. Запустите сервер:
```bash
python manage.py runserver
```

API будет доступно на `http://localhost:8000/api/products/`

### Frontend
1. Перейдите в папку фронтенда:
```bash
cd wildberries-frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение:
```bash
npm start
```

Фронтенд будет доступен на `http://localhost:3000`

## Доступные страницы

### Backend
- `/admin/` - админ-панель Django (логин: admin, пароль: 123)
- `/api/products/` - API товаров (фильтрация через параметры)

### Frontend
- `/` - главная страница с таблицей и графиками
  - Таблица товаров с сортировкой
  - Фильтры по цене, рейтингу и отзывам
  - Графики:
    - Распределение цен
    - Зависимость скидки от рейтинга

## Технологии

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Material-UI, Recharts
- **Парсинг**: BeautifulSoup, Requests
- **База данных**: SQLite