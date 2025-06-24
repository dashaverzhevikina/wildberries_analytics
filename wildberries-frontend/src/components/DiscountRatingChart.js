import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DiscountRatingChart = ({ products }) => {
  // Подготовка данных для графика скидка vs рейтинг
  const getScatterData = () => {
    if (!products || products.length === 0) return [];
    
    return products
      .filter(p => p.discount > 0)
      .map(p => ({
        x: p.rating,
        y: p.discount,
        z: p.reviews_count,
      }));
  };

  const data = getScatterData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Рейтинг" domain={[0, 5]} />
        <YAxis type="number" dataKey="y" name="Скидка (%)" />
        <ZAxis type="number" dataKey="z" name="Отзывы" range={[60, 400]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Товары" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default DiscountRatingChart;