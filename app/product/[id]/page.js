'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/app/components/ProductDetails';
import Button from '@/app/components/Button';
import SimpleSpinner from '@/app/components/spinner/Spinner';
import ProductImageGallery from '@/app/components/ProductImageGallery';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import { useCartContext } from '@/app/context/cartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addtoCart } = useCartContext();

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const productRef = doc(db, "products", id);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const fetchedProduct = productSnap.data();
                    setProduct(fetchedProduct);
                    setImages(fetchedProduct.images || []);
                } else {
                    console.error("No such document!");
                    setProduct(null);
                    setImages([]);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
                setImages([]);
            }
            setLoading(false);
        };

        fetchProductData();
    }, [id]);

    if (loading) {
        return <SimpleSpinner />;
    }

    return (
        <main className="container my-10 mx-auto flex-grow">
            <div className='max-w overflow-hidden m-4'>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    
                    <div>
                        <div className='block md:hidden font-bold text-xl my-3'>{product?.title}</div>
                        <ProductImageGallery images={images} />
                    </div>

                    <div>
                        <ProductDetails 
                            title={product?.title}
                            description={product?.description}
                            category={product?.category}
                            price={product?.price}
                            images={images}
                            customClass="hidden md:block"
                        />
                        <Button className='ms-6 px-6 py-4' onClick={() => addtoCart(product)}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;
