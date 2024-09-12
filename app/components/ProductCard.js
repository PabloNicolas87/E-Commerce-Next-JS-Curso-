import React from 'react';
import Link from 'next/link';
import ProductDetails from './ProductDetails';

const ProductCard = ({ title, description, price, category, id, imageUrls }) => {
  return (
    <Link className='max-w overflow-hidden m-2 shadow rounded-md' href={`/product/${id}`}>
      <ProductDetails 
        title={title}
        description={description}
        category={category}
        price={price}
        id={id}
        images={imageUrls}
      />
    </Link>
  );
};

export default ProductCard;
