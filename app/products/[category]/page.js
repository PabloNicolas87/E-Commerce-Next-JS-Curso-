import React from 'react';
import ProductList from '@/app/components/ProductList';

const getProducts = async (category) => {
  const data = await fetch(`http://localhost:3000/api/productos/${category}`);
  const products = await data.json();
  return products;
};

const Products = async ({ params }) => {
  const { category } = params;
  const products = await getProducts(category);

  return (
    <main className="flex-grow p-3">
      <h1>Página de Productos {category}</h1>
      <ProductList 
        category={category}
        products={products}
      />
    </main> 
  );
};

export default Products;


