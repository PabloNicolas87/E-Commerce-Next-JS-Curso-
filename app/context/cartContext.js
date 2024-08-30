'use client'
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setcart] = useState([]);
    const addtoCart = (item) => {
        setcart([...cart, item]);
    }

    return <CartContext.Provider value = {{ cart, addtoCart }}>
        {children}
    </CartContext.Provider>}

export const useCartContext = () => useContext(CartContext);
