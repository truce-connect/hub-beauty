'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../../context/page';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount } = useCart();

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // If not on client yet, render a simple placeholder to avoid hydration mismatch
  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="h-8 w-32 bg-gray-700 rounded"></div>
            <div className="hidden md:flex space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-16 bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logos.png" 
              alt="Beauty Hub Logo" 
              width={80}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-amber-300 transition-colors">
              Home
            </Link>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('products')}
                className="text-white hover:text-amber-300 transition-colors flex items-center"
              >
                Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'products' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50"
                >
                  <Link href="/products/hair" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors">
                    Hair
                  </Link>
                  <Link href="/products/facial" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors">
                    Facial
                  </Link>
                  <Link href="/products/skin" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors">
                    Body
                  </Link>
                </motion.div>
              )}
            </div>
            
            {/* Spa Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('spa')}
                className="text-white hover:text-amber-300 transition-colors flex items-center"
              >
                Spa Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'spa' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-2 z-50"
                >
                  <Link href="/spa-services/facial" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors">
                    Facial Spa Treatments
                  </Link>
                  <Link href="/spa-services/body" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors">
                    Body Spa Treatments
                  </Link>
                  <Link href="/spa-services/intimate" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors">
                    Intimate Care
                  </Link>
                </motion.div>
              )}
            </div>
            
            <Link href="/about" className="text-white hover:text-amber-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-amber-300 transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-amber-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-amber-300 transition-colors">
                Home
              </Link>
              
              {/* Mobile Products Dropdown */}
              <div>
                <button 
                  onClick={() => toggleDropdown('mobile-products')}
                  className="text-white hover:text-amber-300 transition-colors flex items-center"
                >
                  Products
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'mobile-products' && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link href="/products/hair" className="block text-white hover:text-amber-300 transition-colors">
                      Hair
                    </Link>
                    <Link href="/products/facial" className="block text-white hover:text-amber-300 transition-colors">
                      Facial
                    </Link>
                    <Link href="/products/skin" className="block text-white hover:text-amber-300 transition-colors">
                      Body
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile Spa Services Dropdown */}
              <div>
                <button 
                  onClick={() => toggleDropdown('mobile-spa')}
                  className="text-white hover:text-amber-300 transition-colors flex items-center"
                >
                  Spa Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'mobile-spa' && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link href="/spa-services/facial" className="block text-white hover:text-amber-300 transition-colors">
                      Facial Spa Treatments
                    </Link>
                    <Link href="/spa-services/body" className="block text-white hover:text-amber-300 transition-colors">
                      Body Spa Treatments
                    </Link>
                    <Link href="/spa-services/intimate" className="block text-white hover:text-amber-300 transition-colors">
                      Intimate Care
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/about" className="text-white hover:text-amber-300 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-amber-300 transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;