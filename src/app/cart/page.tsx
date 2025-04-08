'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../context/page';
import Image from 'next/image';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not on client yet, render a simple placeholder to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
              Your Cart
            </span>
          </h1>
          <div className="h-64 bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
            Your Cart
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-300 mb-8">Looks like you have not added any products to your cart yet.</p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-xl font-playfair font-bold text-white">Cart Items</h2>
                </div>
                <div className="divide-y divide-gray-700">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-4 flex flex-col md:flex-row gap-4">
                      <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                          priority
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/bb2.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <div>
                            <h3 className="text-lg font-playfair font-bold text-white">{item.product.title}</h3>
                            <p className="text-amber-400 font-bold">£{parseFloat(item.product.price.replace('£', '')).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-l-full text-white hover:bg-gray-600 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center bg-gray-700 text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-r-full text-white hover:bg-gray-600 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="text-gray-300 text-sm line-clamp-2">{item.product.subtitle}</p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-playfair font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white font-medium">£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shipping</span>
                    <span className="text-white font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-amber-400 font-bold text-lg">£{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/cart/checkout">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-3 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-3 bg-transparent border border-gray-600 text-white font-medium py-3 rounded-full transition-all duration-300 hover:bg-gray-800 text-sm tracking-wide"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 