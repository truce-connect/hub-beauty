'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart, Product } from '../context/page';
import Image from 'next/image';
import Notification from '../Components/Notification';

// Sample products data
const allProducts: Product[] = [
  {
    id: 1,
    title: "Cleansing Tone",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/cleansing-tone.jpg",
    price: "£19.99",
    category: "facial"
  },
  {
    id: 2,
    title: "Asian White",
    subtitle: "Instantly resurface the skin with our collections",
    image: '/product-images/asian-white.jpg',
    price: "£19.99",
    category: "facial"
  },
  {
    id: 3,
    title: "Collagen Xtra-White",
    subtitle: "Instantly resurface the skin with our collections",
    image: '/product-images/collagene-xtra-white.jpg',
    price: "£16.99",
    category: "facial"
  },
  {
    id: 4,
    title: "Ever White Moroccan Whitening Soap",
    subtitle: "Instantly resurface the skin with our collections",
    image: '/product-images/morocan.jpg',
    price: "£15.60",
    category: "skin"
  },
  {
    id: 5,
    title: "Face Wash",
    subtitle: "Instantly resurface the skin with our collections",
    image: '/product-images/face-wash.jpg',
    price: "£17.99",
    category: "facial"
  },
  {
    id: 6,
    title: "Glow Boosting Lighting Oil",
    subtitle: "Instantly resurface the skin with our collections",
    image: '/product-images/glow.jpg',
    price: "£24.99",
    category: "skin"
  },
  {
    id: 7,
    title: "Glutac Injection",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/glutac-injection.jpg",
    price: "£29.99",
    category: "facial"
  },
  {
    id: 8,
    title: "Glutathione",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/glutatione.jpg",
    price: "£28.29",
    category: "facial"
  },
  {
    id: 9,
    title: "Glutathione Face Cream",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/glutatione-face-cream.jpg",
    price: "£25.99",
    category: "facial"
  },
  {
    id: 10,
    title: "Glutathione Super",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/glutatione-super.jpg",
    price: "£25.99",
    category: "facial"
  },
  {
    id: 11,
    title: "Half Cast Oil",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/halfcastoil.jpg",
    price: "£16.99",
    category: "skin"
  },
  {
    id: 12,
    title: "Healthy Glow",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/healthy-glow.jpg",
    price: "£17.59",
    category: "skin"
  },
  {
    id: 13,
    title: "Parley",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/parley.jpg",
    price: "£9.99",
    category: "hair"
  },
  {
    id: 14,
    title: "SYM White",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/sym-white.jpg",
    price: "£25.00",
    category: "facial"
  },
  {
    id: 15,
    title: "Whitening Hydrating",
    subtitle: "Instantly resurface the skin with our collections",
    image: "/product-images/whitening-hydrating.jpg",
    price: "£15.99",
    category: "skin"
  }
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    productName: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory 
    ? allProducts.filter(product => product.category === selectedCategory)
    : allProducts;
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification({
      isVisible: true,
      productName: product.title
    });
  };
  
  if (!mounted) {
    return null; // or a loading spinner
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 md:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
              All Products
            </span>
          </h1>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedCategory('facial')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'facial' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Facial
            </button>
            <button 
              onClick={() => setSelectedCategory('hair')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'hair' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Hair
            </button>
            <button 
              onClick={() => setSelectedCategory('skin')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'skin' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Skin
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
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
                  alt={product.title}
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
                <h3 className="text-xl font-playfair font-bold text-white mb-2">{product.title}</h3>
                <p className="text-amber-400 font-bold text-lg mb-3">{product.price}</p>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.subtitle}</p>
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

export default ProductsPage; 