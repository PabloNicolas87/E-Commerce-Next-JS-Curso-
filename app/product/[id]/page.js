import React from 'react';
import ProductDetails from '@/app/components/ProductDetails';
import ProductImageGallery from '@/app/components/ProductImageGallery';
import { getProductById } from '@/app/utils/firebaseHelpers';
import AddToCartButton from '@/app/components/AddToCartButton';

const ProductDetail = async ({ params }) => {
    const { id } = params;

    let product = null;
    let images = [];

    try {
        product = await getProductById(id);
        images = product.images || [];
    } catch (error) {
        console.error(error);
        throw error;
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
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
