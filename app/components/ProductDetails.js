'use client';
import React from 'react';
import ProductImageCard from './ProductImageCard';
import { usePathname } from 'next/navigation';

const ProductDetails = ({ title, description, category, price, customClass = '', images = [] }) => {
  const pathname = usePathname();

  const isProductPage = pathname.includes('/product/');

  return (
    <div className='px-4 py-4'>
      <div className={`${customClass}`}>
        <div className='font-bold text-xl my-3 text-center'>{title}</div>
      </div>

      <div className={`my-3 d-flex ${isProductPage ? 'hidden' : ''}`}>
        <ProductImageCard imageUrls={images} width={200} height={300} />
      </div>

      <p className='text-gray-700 text-base my-3 min-h-24'>{description}</p>

      <div className='py-4 flex'>
        <p className='pr-2'>Category:</p>
        <span className='inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700 whitespace-nowrap capitalize'>{category}</span>
      </div>

      <div className='py-4 flex'>
        <p className='pr-2'>Price:</p>
        <span className='inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700'>${price}</span>
      </div>
    </div>
  );
};

export default ProductDetails;
