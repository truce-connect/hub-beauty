'use client';

import React from 'react';
import Slider from './Components/Slider/page';
import Navbar from './Components/Navbar/page';
import ProductCategories from './Components/productsMain/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <Slider />
      <ProductCategories />
      
      <div className="container mx-auto px-4 py-12">
        {/* Additional content can be added here */}
      </div>
    </div>
  );
}
