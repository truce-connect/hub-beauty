'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Used for mobile menu
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Used for dropdown menus
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Handle scroll and authentication state
  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkAuthStatus);

    // Initial checks
    handleScroll();
    checkAuthStatus();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Handle cart count
  useEffect(() => {
    if (isMounted) {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(storedCart.length);
      } catch {
        setCartCount(0);
      }
    }
  }, [isMounted]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle mobile menu visibility
    setActiveDropdown(null); // Close any open dropdowns
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown)); // Toggle dropdown visibility
  };

  const closeDropdown = () => {
    setActiveDropdown(null); // Close dropdowns
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/Components/About', label: 'About' },
  ];

  const spaServicesLinks = [
    { href: '/spa-services/body-spa', label: 'Body Spa' },
    { href: '/spa-services/facial-spa', label: 'Facial Spa' },
    { href: '/spa-services/intimate-spa', label: 'Intimate Spa' },
  ];

  const productLinks = [
    { href: '/products/facial', label:'Facial'},
    { href: '/products/hair',   label:'Hair'},
    {href:   '/products/skin', label:'Skin'},
    

  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" passHref>
            {isMounted ? (
              <Image
                src="/images/logos.png"
                alt="Beauty Hub Logo"
                width={80}
                height={40}
                className="object-contain"
                priority
                unoptimized
              />
            ) : (
              <div className="w-[80px] h-[40px]" />
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-amber-300 transition-colors md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 font-semibold text-center items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-amber-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Spa Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => toggleDropdown('spa-services')}
              onMouseLeave={closeDropdown}
            >
              <button
                className="text-white hover:text-amber-300 transition-colors flex items-center"
                aria-expanded={activeDropdown === 'spa-services'}
                aria-controls="spa-services-menu"
              >
                Spa Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'spa-services' && (
                <motion.div
                  id="spa-services-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50"
                >
                  {spaServicesLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors"
                      onClick={closeDropdown}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Products Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => toggleDropdown('products')}
              onMouseLeave={closeDropdown}
            >
              <button
                className="text-white hover:text-amber-300 transition-colors flex items-center"
                aria-expanded={activeDropdown === 'products'}
                aria-controls="products-menu"
              >
                Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'products' && (
                <motion.div
                  id="products-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50"
                >
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-amber-300 transition-colors"
                      onClick={closeDropdown}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Cart Icon */}
            <Link href="/CartPage"   className ="relative text-white hover:text-amber-300 transition-colors flex items-center">
              <FaShoppingCart className="text-xl" />
              <span className="ml-2">Cart ({cartCount})</span>
            </Link>

            {/* Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-amber-300 transition-colors flex items-center"
              >
                <FaSignOutAlt className="text-xl mr-2" />
                Logout
              </button>
            ) : (
              <Link
                href="/Login"
                className="text-white hover:text-amber-300 transition-colors flex items-center"
              >
                <FaSignInAlt className="text-xl mr-2" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-white hover:text-amber-300"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;