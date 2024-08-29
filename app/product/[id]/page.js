'use client'
import { useParams } from 'next/navigation'
import React, { Suspense } from 'react'
import mockData from '@/data/mockData'
import Image from 'next/image'
import ProductDetails from '@/app/components/ProductDetails'

const ProductDetail = () => {
    const {id} = useParams();
    const singleProduct = mockData.find(product => product.id.toString() === id.toString())
  return (
    <main className="flex-grow p-3">
      <div className='max-w overflow-hidden m-4'>
        <div className='px-6 py-4 grid md:grid-cols-2 grid-cols-1'>
            
            <Image src={singleProduct.imageUrl} alt={singleProduct.title} height={150} width={150} className='p-4 hidden md:block object-cover w-full' />      
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetails 
                  title={singleProduct.title}
                  description={singleProduct.description}
                  category={singleProduct.category}
                  price={singleProduct.price}
                  imageUrl={singleProduct.imageUrl}
                  customClass="md:hidden"
              />  
            </Suspense>
            
            
        </div>
      </div>
      
    </main>
  )
}

export default ProductDetail