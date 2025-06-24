import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import {
  Slider,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PriceHistogram from './PriceHistogram';
import DiscountRatingChart from './DiscountRatingChart';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [minReviews, setMinReviews] = useState(0);
  const [sortModel, setSortModel] = useState([]);

  const columns = [
    { field: 'name', headerName: 'Название товара', width: 300 },
    { field: 'price', headerName: 'Цена', type: 'number', width: 120 },
    { field: 'discounted_price', headerName: 'Цена со скидкой', type: 'number', width: 150 },
    { field: 'discount', headerName: 'Скидка (%)', type: 'number', width: 120 },
    { field: 'rating', headerName: 'Рейтинг', type: 'number', width: 120 },
    { field: 'reviews_count', headerName: 'Кол-во отзывов', type: 'number', width: 150 },
  ];

  useEffect(() => {
    fetchProducts();
  }, [priceRange, minRating, minReviews, sortModel]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const params = {
        min_price: priceRange[0],
        max_price: priceRange[1],
        min_rating: minRating,
        min_reviews: minReviews,
      };
      
      if (sortModel.length > 0) {
        params.ordering = sortModel[0].field;
        if (sortModel[0].sort === 'desc') {
          params.ordering = `-${params.ordering}`;
        }
      }
      
      const response = await axios.get('/api/products/', { params });
      setProducts(response.data);
      
      // Обновляем диапазон цен, если это первый запрос
      if (minPrice === 0 && maxPrice === 100000 && response.data.length > 0) {
        const prices = response.data.map(p => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <Box sx={{ height: '100vh', width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Аналитика товаров Wildberries
      </Typography>
      
      <Box sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Фильтры
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ width: 300 }}>
            <Typography gutterBottom>Диапазон цен</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={minPrice}
              max={maxPrice}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                size="small"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                type="number"
                sx={{ width: 100 }}
              />
              <TextField
                size="small"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                type="number"
                sx={{ width: 100 }}
              />
            </Box>
          </Box>
          
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Минимальный рейтинг</InputLabel>
            <Select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              label="Минимальный рейтинг"
            >
              <MenuItem value={0}>Любой</MenuItem>
              <MenuItem value={3}>3+</MenuItem>
              <MenuItem value={4}>4+</MenuItem>
              <MenuItem value={4.5}>4.5+</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Минимум отзывов</InputLabel>
            <Select
              value={minReviews}
              onChange={(e) => setMinReviews(e.target.value)}
              label="Минимум отзывов"
            >
              <MenuItem value={0}>Любое</MenuItem>
              <MenuItem value={10}>10+</MenuItem>
              <MenuItem value={50}>50+</MenuItem>
              <MenuItem value={100}>100+</MenuItem>
              <MenuItem value={500}>500+</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            loading={loading}
            components={{ Toolbar: CustomToolbar }}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Распределение цен
            </Typography>
            <PriceHistogram products={products} />
          </Box>
          
          <Box sx={{ flex: 1, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Скидка vs Рейтинг
            </Typography>
            <DiscountRatingChart products={products} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductTable;