import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ data, category }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {data.map((product) => (
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
