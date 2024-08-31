'use client'
import React from 'react';
import { useCartContext } from '../context/cartContext';

const Cart = () => {
  const { cart } = useCartContext();

  return (
    <main className="container mx-auto flex-grow my-10">
      <h1>Página de Cart</h1>
      {cart.map((item, index) => (
        <h2 key={index}>{item.title} - ${item.price}</h2>
      ))}
    </main> 
  );
}

export default Cart;
