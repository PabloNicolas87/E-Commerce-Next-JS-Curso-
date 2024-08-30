'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import ProductDetails from '@/app/components/ProductDetails';
import Button from '@/app/components/Button';
import { useCartContext } from '@/app/context/cartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const {addToCart} = useCartContext();

  
    const getProductById = async (id) => {
        try {
            const productRef = doc(db, "products", id);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
                return productSnap.data();
            } else {
                console.error("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error fetching product:", error);
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
            <ProductDetails 
                title={product.title}
                description={product.description}
                category={product.category}
                price={product.price}
                imageUrl={product.imageUrl}
            />
            <Button children={'Add to Cart'} className='p-3' onclick={() => addToCart(singleProduct)}></Button>
        </main>
    );
}

export default ProductDetail;
