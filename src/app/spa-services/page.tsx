'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../Components/Navbar/page';

const SpaServicesPage = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const spaServices = [
    {
      id: 1,
      title: 'Facial Spa Treatments',
      description: 'Rejuvenate your skin with our premium facial treatments designed to restore your natural glow',
      image: '/spa-images/facialr.jpg',
      link: '/spa-services/facial-spa'
    },
    {
      id: 2,
      title: 'Body Spa Treatments',
      description: 'Indulge in our luxurious body treatments for complete relaxation and skin rejuvenation',
      image: '/spa-images/bodyjpg.jpg',
      link: '/spa-services/body-spa'
    },
    {
      id: 3,
      title: 'Intimate Care',
      description: 'Experience our specialized intimate care treatments for enhanced well-being and confidence',
      image: '/spa-images/intimate-spai.jpg',
      link: '/spa-services/intimate-spa'
    }
  ];

  // If not on client yet, render a simple placeholder to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Navbar />
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
                  Spa Services
                </span>
              </h1>
              <div className="h-10 w-32 bg-gray-800 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative h-96 rounded-xl overflow-hidden bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="h-8 w-48 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 w-32 bg-gray-700 rounded-full"></div>
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
            <h1 className="text-4xl md:text-5xl font-playfair font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
                Spa Services
              </span>
            </h1>
            <Link href="/spa-services/all">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
              >
                View All Services
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spaServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-xl overflow-hidden group"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    height={300}
                    width={400}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/bb2.jpg';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <Link href={service.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaServicesPage; 