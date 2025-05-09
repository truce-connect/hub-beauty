'use client';

import React from 'react';
import { useCart } from '../context/CartProvider';

const CartIcon: React.FC = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);

  return (
    <div className="relative" aria-label="View Cart">
      <span className="material-icons text-3xl">shopping_cart</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;