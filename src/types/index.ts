import { NextResponse } from 'next/server';

// src/types/index.ts
export interface FacialProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: number;
  title: string; // Add this
  subtitle: string; // Add this
}

// API route handler for fetching facial products
export async function GET() {
  const products: FacialProduct[] = [
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
    },
  ];

  return NextResponse.json(products);
}