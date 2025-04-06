'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SearchIcon from './Searchicon/page';
import LoginIcon from './Login/page';
import CartIcon from './Carticon/page';

const TopBar = () => {
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-500/20 shadow-lg backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          {/* Left side - Search and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="scale-125">
              <SearchIcon />
            </div>
            
            <nav className="hidden md:flex space-x-6" ref={dropdownRef}>
              <Link href="/" className="text-amber-400 font-medium text-lg hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-amber-400 font-medium text-lg hover:text-white transition-colors">
                Products
              </Link>
              
              {/* Spa Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('spa')}
                  className="text-amber-400 font-medium text-lg hover:text-white transition-colors flex items-center"
                >
                  Spa Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'spa' && (
                  <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link href="/spa-services/facial" className="block px-4 py-2 text-base text-amber-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        Facial Spa Treatments
                      </Link>
                      <Link href="/spa-services/body" className="block px-4 py-2 text-base text-amber-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        Body Spa Treatments
                      </Link>
                      <Link href="/spa-services/intimate" className="block px-4 py-2 text-base text-amber-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        Intimate Care
                      </Link>
                      <Link href="/spa-services/add-on" className="block px-4 py-2 text-base text-amber-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        Add-On Facial Treatments
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/about" className="text-amber-400 font-medium text-lg hover:text-white transition-colors">
                About
              </Link>
              
              {/* Support Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('support')}
                  className="text-amber-400 font-medium text-lg hover:text-white transition-colors flex items-center"
                >
                  Support
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'support' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link href="/support/contact" className="block px-4 py-2 text-base text-amber-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        Contact Us
                      </Link>
                      <Link href="/support/faq" className="block px-4 py-2 text-base text-amber-100 hover:bg-gray-700 hover:text-white" role="menuitem">
                        FAQ
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-24 w-[140px] flex items-center justify-center"
            >
              {mounted && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/logos.png"
                  alt="Beauty Hub Logo"
                  className="h-full w-auto"
                />
              )}
            </motion.div>
          </div>

          {/* Right side - Login and Cart */}
          <div className="flex items-center justify-end space-x-8">
            <div className="scale-125">
              <LoginIcon />
            </div>
            <div className="scale-125">
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar; 