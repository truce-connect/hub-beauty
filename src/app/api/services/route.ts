import { NextResponse } from 'next/server';

    export async function GET() {
      const services = [
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
      return NextResponse.json(services);
    }