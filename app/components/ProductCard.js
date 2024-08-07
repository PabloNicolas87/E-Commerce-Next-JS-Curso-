import React from 'react'
import Link from 'next/link'

const ProductCard = ({title, description, price, category, id}) => {
  return (
    <Link className='max-w overflow-hidden m-4 shadow rounded-md' href={`/product/${id}`}>
        <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>
                {title}
            </div>
            <p className='text-gray-700 text-base'>{description}</p>
            <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{category}</span>
            </div>
            <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{price}</span>
            </div>
        </div>
    </Link>
    
  )
}

export default ProductCard