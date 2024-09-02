import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products = [], category }) => {



  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-3'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          category={product.category}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;

