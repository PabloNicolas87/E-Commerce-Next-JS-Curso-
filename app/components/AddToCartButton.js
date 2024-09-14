'use client';

import { useCartContext } from '@/app/context/cartContext';
import Button from './Button';

const AddToCartButton = ({ product }) => {
    const { addToCart } = useCartContext();

    return (
        <Button className='ms-6 px-6 py-4' onClick={() => addToCart(product)}>
            Add to Cart
        </Button>
    );
};

export default AddToCartButton;