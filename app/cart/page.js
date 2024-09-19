'use client';
import React from 'react';
import { useCartContext } from '../context/cartContext';

const Cart = () => {
  const { cart } = useCartContext();

  return (
    <main className="container mx-auto flex-grow my-10">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="my-4 p-4 border rounded">
            <h2 className="font-semibold">{item.title}</h2>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
          </div>
        ))
      )}
    </main>
  );
};

export default Cart;
