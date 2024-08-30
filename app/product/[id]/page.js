'use client'
import { useParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import ProductDetails from '@/app/components/ProductDetails';
import Button from '@/app/components/Button';
import { useCartContext } from '@/app/context/cartContext';
import Image from 'next/image'


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const {addtoCart} = useCartContext();

  
    const getProductById = async (id) => {

    try {
        if (!id) {
            return null;
        }

        const productRef = doc(db, "products", id);

        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            return productSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};


    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductById(id);
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
      <main className="flex-grow p-3">
      <div className='max-w overflow-hidden m-4'>
        <div className='px-6 py-4 grid md:grid-cols-2 grid-cols-1'>
            
            <Image src={product.imageUrl} alt={product.title} height={150} width={150} className='p-4 hidden md:block object-cover w-full' />
            <div>
              <ProductDetails 
                  title={product.title}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  customClass="md:hidden"
              />  
              <Button className='p-3' onClick={() => addtoCart(product)}>
                  Add to Cart
              </Button>
            </div>
              

        </div>
      </div>

    </main>
    );
}

export default ProductDetail;