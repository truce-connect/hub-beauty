'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../../context/page';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (isClient && cartItems.length === 0) {
      router.push('/cart');
    }
  }, [isClient, cartItems.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'postcode', 'cardNumber', 'expiryDate', 'cvv', 'nameOnCard'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Card number validation (simple check for 16 digits)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Expiry date validation (MM/YY format)
    if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    // CVV validation (3 or 4 digits)
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      
      // Clear cart after successful order
      // This would typically be handled by your cart context
      // For now, we'll just show the success message
    }, 2000);
  };

  // If not on client yet, render a simple placeholder to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
              Checkout
            </span>
          </h1>
          <div className="h-64 bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">Order Confirmed!</h2>
            <p className="text-gray-300 mb-8">Thank you for your purchase. Your order has been successfully placed.</p>
            <p className="text-amber-400 font-bold text-lg mb-8">Order Total: £{totalPrice.toFixed(2)}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide"
                >
                  Continue Shopping
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-transparent border border-gray-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:bg-gray-800 text-sm tracking-wide"
                >
                  Return Home
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300">
            Checkout
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-xl font-playfair font-bold text-white mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="address" className="block text-gray-300 text-sm font-medium mb-1">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full bg-gray-700 border ${errors.address ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                ></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="city" className="block text-gray-300 text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.city ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="postcode" className="block text-gray-300 text-sm font-medium mb-1">Postcode</label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.postcode ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                </div>
                <div>
                  <label htmlFor="country" className="block text-gray-300 text-sm font-medium mb-1">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                  </select>
                </div>
              </div>
              
              <h2 className="text-xl font-playfair font-bold text-white mb-6">Payment Information</h2>
              
              <div className="mb-6">
                <label htmlFor="cardNumber" className="block text-gray-300 text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full bg-gray-700 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="expiryDate" className="block text-gray-300 text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`w-full bg-gray-700 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-gray-300 text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className={`w-full bg-gray-700 border ${errors.cvv ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
                <div>
                  <label htmlFor="nameOnCard" className="block text-gray-300 text-sm font-medium mb-1">Name on Card</label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 border ${errors.nameOnCard ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.nameOnCard && <p className="text-red-500 text-xs mt-1">{errors.nameOnCard}</p>}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <Link href="/cart">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border border-gray-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:bg-gray-800 text-sm tracking-wide"
                  >
                    Back to Cart
                  </motion.button>
                </Link>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg border border-amber-300/30 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </motion.button>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-playfair font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white font-medium">£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-white font-medium">Free</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-amber-400 font-bold text-lg">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-playfair font-bold text-white mb-3">Items in Your Order</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/bb2.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.product.title}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-amber-400 font-bold text-sm">£{(parseFloat(item.product.price.replace('£', '')) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 