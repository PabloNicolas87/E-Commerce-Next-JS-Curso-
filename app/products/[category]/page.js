'use client'
import { useParams } from 'next/navigation';
import React from 'react';
import mockData from '@/data/mockData';
import ProductList from '@/app/components/ProductList';

const Tipo = () => {
  const { category } = useParams();
  const filterData = category === 'all'
    ? mockData
    : mockData.filter(item => item.category.toLowerCase() === category.toLowerCase());

  return (
    <main className="flex-grow p-3">
      <h1>Página de: {category ? category : 'desconocido'}</h1>
      <ProductList 
        category={category}
        data={filterData} 
      />
    </main>
  );
};

export default Tipo;

