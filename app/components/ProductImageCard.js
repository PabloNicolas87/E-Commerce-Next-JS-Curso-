import React from 'react';
import Image from 'next/image';
import SimpleSpinner from './spinner/Spinner';

const ProductImageCard = ({ imageUrls = [], width = 300, height = 300 }) => {
  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : '';  

  return (
    <div className='flex justify-center items-center m-auto' style={{ width, height }}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Product image`}
          width={width}
          height={height}
          className='object-contain object-center m-auto max-h-full'
        />
      ) : (
        <SimpleSpinner />
      )}
    </div>
  );
};

export default ProductImageCard;
