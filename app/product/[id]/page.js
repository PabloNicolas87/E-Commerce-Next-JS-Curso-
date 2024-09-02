'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/app/components/ProductDetails';
import Button from '@/app/components/Button';
import SimpleSpinner from '@/app/components/spinner/Spinner';
import ProductImageGallery from '@/app/components/ProductImageGallery';
import { getProductById, fetchProductImages } from '@/app/utils/firebaseHelpers';
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
            const fetchedProduct = await getProductById(id);
            const fetchedImages = await fetchProductImages(id);
            setProduct(fetchedProduct);
            setImages(fetchedImages);
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
                        <div className='block md:hidden font-bold text-xl my-3'>{product.title}</div>
                        <ProductImageGallery images={images} />
                    </div>

                    <div>
                        <ProductDetails 
                            title={product.title}
                            description={product.description}
                            category={product.category}
                            price={product.price}
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
