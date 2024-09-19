'use client';

import { useState } from 'react';
import { useCartContext } from '@/app/context/cartContext';
import Button from './Button';

const AddToCartButton = ({ product }) => {
    const [quantity, setQuantity] = useState(1); // Estado local para la cantidad
    const { addToCart } = useCartContext();

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity }); // Pasa la cantidad junto con el producto
    };

    return (
        <div className='flex items-center'>
            <Button className='px-4 py-2' onClick={handleDecrement}>
                -
            </Button>
            <span className='mx-4'>{quantity}</span>
            <Button className='px-4 py-2' onClick={handleIncrement}>
                +
            </Button>
            <Button className='ms-6 px-6 py-4' onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
};

export default AddToCartButton;
