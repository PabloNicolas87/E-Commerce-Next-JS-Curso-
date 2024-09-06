'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductDetails from './ProductDetails';
import { fetchProductImages } from '@/app/utils/firebaseHelpers';

const ProductCard = ({ title, description, price, category, id }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const images = await fetchProductImages(id);
      if (images.length > 0) {
        setImageUrl(images[0]);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <Link className='max-w overflow-hidden m-2 shadow rounded-md' href={`/product/${id}`}>
      <ProductDetails 
        title={title}
        description={description}
        category={category}
        price={price}
        id={id}
      />
    </Link>
  );
};

export default ProductCard;

