import React from 'react';
import Image from 'next/image';


const ProductDetails = ({ title, description, category, price, customClass= '', imageUrl}) => {
  return (
    <div className='px-6 py-4'>

        <div className={`${customClass}`}>
          <div className='font-bold text-xl my-3'>{title}</div>
        </div>

        {imageUrl && (
          <div className='my-3'>
              <Image
                  src={imageUrl}
                  alt={title}
                  width={500}  
                  height={256} 
                  className='w-full h-64 object-contain'
              />
          </div>
        )}


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
