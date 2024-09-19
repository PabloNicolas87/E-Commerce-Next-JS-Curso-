'use client';
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, actualiza la cantidad
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += product.quantity;
                return updatedCart;
            } else {
                // Si el producto no está en el carrito, añádelo con su cantidad
                return [...prevCart, product];
            }
        });
    };

    const getCartCount = () => {
        // Sumar todas las cantidades de productos en el carrito
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
