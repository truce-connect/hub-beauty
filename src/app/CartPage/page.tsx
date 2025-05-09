"use client";

import { useCart } from "@/app/Components/Navbar/context/CartProvider";
import React from "react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                {item.image && <img src={item.image} alt={item.name} className="w-20 h-20" />}
              </div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;