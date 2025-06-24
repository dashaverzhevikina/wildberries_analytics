import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceHistogram = ({ products }) => {
  // Создаем гистограмму цен
  const getPriceData = () => {
    if (!products || products.length === 0) return [];
    
    const maxPrice = Math.max(...products.map(p => p.price));
    const step = Math.ceil(maxPrice / 10);
    
    const priceRanges = [];
    for (let i = 0; i < 10; i++) {
      const rangeStart = i * step;
      const rangeEnd = (i + 1) * step;
      
      const count = products.filter(
        p => p.price >= rangeStart && p.price < rangeEnd
      ).length;
      
      priceRanges.push({
        name: `${rangeStart}-${rangeEnd}`,
        count: count,
      });
    }
    
    return priceRanges;
  };

  const data = getPriceData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" name="Количество товаров" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriceHistogram;