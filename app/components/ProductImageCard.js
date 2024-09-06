'use client'
import React, { useEffect, useState } from 'react';
import { fetchProductImages } from '@/app/utils/firebaseHelpers';
import Image from 'next/image';
import SimpleSpinner from './spinner/Spinner';

const ProductImageCard = ({ id, width = 300, height = 300 }) => {
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
    <div className='flex justify-center items-center m-auto' style={{ width, height }}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Image for product ${id}`}
          width={width}
          height={height}
          className='object-contain object-center m-auto max-h-full'
        />
      ) : (
        <SimpleSpinner></SimpleSpinner>
      )}
    </div>
  );
};

export default ProductImageCard;
