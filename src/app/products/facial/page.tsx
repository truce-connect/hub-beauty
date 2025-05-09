'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../../Components/Navbar/context/CartProvider';
import Notification from '../../Components/Notification';
import { FacialProduct, CartItem } from '@/types';

const FacialProductsPage = () => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({
    isVisible: false,
    productName: '',
  });
  const [products, setProducts] = useState<FacialProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products/facial');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: FacialProduct[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: FacialProduct) => {
    const cartItem: CartItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      category: 'facial',
      image: product.image,
      description: product.description,
      quantity: 1,
      title: product.name,
      subtitle: product.description.slice(0, 50) + '...'
    };
    addToCart(cartItem);
    setNotification({
      isVisible: true,
      productName: product.name,
    });
  };

  if (loading) {
    return <div className="container mx-auto py-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      <Notification
        message="Product added to cart!"
        isVisible={notification.isVisible}
        onClose={() => setNotification({ ...notification, isVisible: false })}
        productName={notification.productName}
      />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
              Facial Products
            </span>
          </h1>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
            >
              View All Products
            </motion.button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-xl overflow-hidden shadow-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative h-64 w-full flex items-center justify-center bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/bb2.jpg';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-white mb-2">{product.name}</h3>
                <p className="text-amber-400 font-bold text-lg mb-3">£{product.price.toFixed(2)}</p>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between">
                  <Link href={`/products/${product.id}`}>
                    <button className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-1 px-4 rounded-full transition-all duration-300 text-sm"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacialProductsPage;