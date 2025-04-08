'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../../context/page';

// Sample hair products data
const hairProducts = [
  {
    id: 1,
    name: 'Luxury Hair Oil',
    price: 39.99,
    image: '/product-images/hair-oil.jpg',
    description: 'Nourishing hair oil with argan and coconut oils for smooth, shiny hair.',
  },
  {
    id: 2,
    name: 'Hair Growth Serum',
    price: 49.99,
    image: '/product-images/hair-serum.jpg',
    description: 'Advanced hair growth serum that promotes thicker, fuller hair.',
  },
  {
    id: 3,
    name: 'Hair Mask',
    price: 34.99,
    image: '/product-images/hair-mask.jpg',
    description: 'Deep conditioning hair mask for damaged and dry hair.',
  },
  {
    id: 4,
    name: 'Hair Shampoo',
    price: 24.99,
    image: '/product-images/hair-shampoo.jpg',
    description: 'Gentle, sulfate-free shampoo for all hair types.',
  },
  {
    id: 5,
    name: 'Hair Conditioner',
    price: 24.99,
    image: '/product-images/hair-conditioner.jpg',
    description: 'Moisturizing conditioner that detangles and softens hair.',
  },
  {
    id: 6,
    name: 'Hair Styling Cream',
    price: 29.99,
    image: '/product-images/hair-styling.jpg',
    description: 'Versatile styling cream for defined curls and manageable hair.',
  }
];

const HairProductsPage = () => {
  const { addToCart } = useCart();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
              Hair Products
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
          {hairProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-xl overflow-hidden shadow-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
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
                    onClick={() => addToCart({
                      id: product.id,
                      title: product.name,
                      subtitle: product.description,
                      image: product.image,
                      price: `£${product.price.toFixed(2)}`,
                      category: 'hair'
                    })}
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

export default HairProductsPage; 