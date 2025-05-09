'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/Components/Navbar/context/CartProvider';
import Navbar from '@/app/Components/Navbar/page';

// Define the Service type
interface Service {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category: string;
}

// Fallback data
const fallbackServices: Service[] = [
  {
    id: '1',
    name: 'Luxury Facial',
    price: 99.99,
    image: '/spa-images/facial.jpg',
    description: 'A rejuvenating facial treatment.',
    category: 'Facial Spa',
  },
  {
    id: '2',
    name: 'Full Body Massage',
    price: 129.99,
    image: '/spa-images/body.jpg',
    description: 'A relaxing full-body massage.',
    category: 'Body Spa',
  },
  {
    id: '3',
    name: 'Intimate Care Session',
    price: 79.99,
    image: '/spa-images/intimate.jpg',
    description: 'Specialized intimate care treatment.',
    category: 'Intimate Care',
  },
];

export default function AllSpaServices() {
  const { addToCart } = useCart();
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data: Service[] = await response.json();
        setAllServices(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Unable to load services. Showing sample services.');
        setAllServices(fallbackServices); // Use fallback data
      }
    }
    fetchServices();
  }, []);

  // Get unique categories
  const categories = [...new Set(allServices.map(service => service.category))];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradienttheros to-b from-gray-900 to-black">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-playfair font-bold mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
              All Spa Services
            </span>
          </h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair font-bold mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
            All Spa Services
          </span>
        </h1>
        {error && (
          <div className="text-red-400 mb-4">{error}</div>
        )}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-playfair font-semibold mb-4 text-white">{category}</h2>
            <ul className="space-y-4">
              {allServices
                .filter((service) => service.category === category)
                .map((service) => (
                  <li key={service.id} className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-amber-500/20">
                    <div>
                      <h3 className="text-xl font-playfair font-bold text-white">{service.name}</h3>
                      {service.description && <p className="text-gray-300">{service.description}</p>}
                      <p className="text-amber-400 font-bold">Price: ${service.price}</p>
                      {service.image && (
                        <img src={service.image} alt={service.name} className="w-20 h-20 object-cover mt-2" />
                      )}
                    </div>
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full"
                      onClick={() =>
                        addToCart({
                          id: service.id,
                          name: service.name,
                          price: service.price,
                          image: service.image,
                          description: service.description,
                          category: service.category,
                          quantity: 1,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}