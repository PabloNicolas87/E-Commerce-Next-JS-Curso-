import React from 'react';
import Link from 'next/link';
import ProductDetails from './ProductDetails';

const ProductCard = ({ title, description, price, category, id, imageUrl }) => {

  return (
    <Link className='max-w overflow-hidden m-3 shadow rounded-md' href={`/product/${id}`}>
        <ProductDetails 
            title={title}
            description={description}
            category={category}
            price={price}
            imageUrl={imageUrl}
        />
    </Link>
  );
};

export default ProductCard;
