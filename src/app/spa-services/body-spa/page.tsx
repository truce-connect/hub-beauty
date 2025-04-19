'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../../Components/Navbar/page';

const BodySpaPage = () => {
  const [isClient, setIsClient] = useState(false);
   
  useEffect(() => {
    setIsClient(true);
  }, []);

  const bodyServices = [
    {
      id: 1,
      title: 'Body Scrub',
      description: 'Exfoliating treatment that removes dead skin cells, leaving your skin smooth, soft, and rejuvenated.',
      duration: '60 minutes',
      price: '£85',
      image: '/spa-images/gh.jpg',
      category: 'Body-spa',
      categoryLink: '/spa-services/body-spa'
    },
    {
      id: 2,
      title: 'Body Wrap',
      description: 'Detoxifying treatment that wraps your body in therapeutic ingredients to nourish and hydrate your skin.',
      duration: '75 minutes',
      price: '£110',
      image: '/spa-images/initi3.jpg',
      category: 'Body-spa',
      categoryLink: '/spa-services/body-spa'
    },
    {
      id: 3,
      title: 'Cellulite Treatment',
      description: 'Targeted treatment to reduce the appearance of cellulite and improve skin firmness and texture.',
      duration: '60 minutes',
      price: '£95',
      image: '/spa-images/facial5.jpg',
      category: 'Body-spa',
      categoryLink: '/spa-services/body-spa'
    },
    {
      id: 5,
      title: 'Body Wrap',
      description: 'Detoxifying treatment that wraps your body in therapeutic ingredients to nourish and hydrate your skin.',
      duration: '75 minutes',
      price: '£110',
      image: '/spa-images/initi3.jpg',
      category: 'Body-spa',
      categoryLink: '/spa-services/body-spa'
    },
    {
      id: 6,
      title: 'Cellulite Treatment',
      description: 'Targeted treatment to reduce the appearance of cellulite and improve skin firmness and texture.',
      duration: '60 minutes',
      price: '£95',
      image: '/spa-images/facial5.jpg',
      category: 'Body-spa',
      categoryLink: '/spa-services/body-spa'
    }
  ];

  const categories = [...new Set(bodyServices.map(service => service.category))];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Navbar />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-300">
                All Spa Services
              </h1>
              <div className="h-10 w-32 bg-gray-800 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="relative h-96 rounded-xl overflow-hidden bg-gray-800 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 flex flex-col justify-end p-6">
                    <div className="h-8 w-48 bg-gray-700 rounded mb-2" />
                    <div className="h-4 w-full bg-gray-700 rounded mb-4" />
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-700 rounded" />
                      <div className="h-4 w-16 bg-gray-700 rounded" />
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="h-10 w-32 bg-gray-700 rounded-full" />
                      <div className="h-10 w-32 bg-gray-700 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-300">
              All Spa Services
            </h1>
            <Link href="/spa-services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
              >
                Back to Services
              </motion.button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
  {categories.map((category) => (
    <Link
      key={category}
      href={`/spa-services/${
        category.toLowerCase() === "facial"
          ? "facial-spa"
          : category.toLowerCase()
      }`}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg text-sm tracking-wide"
      >
        {category} Services
      </motion.button>
    </Link>
  ))}
</div>

          

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bodyServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                   width={500}
                   height={650}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={service.id <= 6}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/bb2.jpg';
                      target.onerror = null;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {service.category}
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-white mb-2 mt-8">{service.title}</h3>
                    <p className="text-gray-200 mb-4 line-clamp-3">{service.description}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-amber-300">{service.duration}</span>
                      <span className="text-white font-bold">{service.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <Link href={service.categoryLink}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gray-800/80 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg text-sm tracking-wide"
                        >
                          View Category
                        </motion.button>
                      </Link>
                      <Link href="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
                        >
                          Book Now
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodySpaPage;