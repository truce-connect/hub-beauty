import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
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
  ];
  return NextResponse.json(products);
}