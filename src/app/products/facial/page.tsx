'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../../context/page';
import Notification from '../../Components/Notification';

// Define a type for the facial product
interface FacialProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Sample facial products data
const facialProducts: FacialProduct[] = [
  {
    id: 1,
    name: 'Luxury Facial Cream',
    price: 49.99,
    image: '/product-images/glutatione-face-cream.jpg',
    description: 'A luxurious facial cream with gold particles and rare ingredients for ultimate skin rejuvenation.',
  },
  {
    id: 2,
    name: 'Anti-Aging Serum',
    price: 79.99,
    image: '/product-images/glutatione.jpg',
    description: 'Advanced anti-aging serum that reduces fine lines and wrinkles while improving skin elasticity.',
  },
  {
    id: 3,
    name: 'Hydrating Face Mask',
    price: 34.99,
    image: '/product-images/cleansing-tone.jpg',
    description: 'Deeply hydrating face mask with hyaluronic acid for plump, glowing skin.',
  },
  {
    id: 4,
    name: 'Gold-Infused Eye Cream',
    price: 59.99,
    image: '/product-images/asian-white.jpg',
    description: 'Luxurious eye cream with gold particles to reduce dark circles and puffiness.',
  },
  {
    id: 5,
    name: 'Vitamin C Brightening Serum',
    price: 45.99,
    image: '/product-images/collagene-xtra-white.jpg',
    description: 'Brightening serum with Vitamin C to even skin tone and reduce hyperpigmentation.',
  },
  {
    id: 6,
    name: 'Facial Cleanser',
    price: 24.99,
    image: '/product-images/face-wash.jpg',
    description: 'Gentle facial cleanser that removes impurities without stripping natural oils.',
  }
];

const FacialProductsPage = () => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({
    isVisible: false,
    productName: ''
  });
  
  const handleAddToCart = (product: FacialProduct) => {
    addToCart({
      id: product.id,
      title: product.name,
      subtitle: product.description,
      image: product.image,
      price: `£${product.price.toFixed(2)}`,
      category: 'facial'
    });
    setNotification({
      isVisible: true,
      productName: product.name
    });
  };
  
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
          {facialProducts.map((product) => (
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