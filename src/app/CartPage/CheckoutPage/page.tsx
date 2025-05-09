'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock checkout logic
    router.push('/payment');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;