'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Handle scroll and authentication state
  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
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
    setIsMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/Components/About', label: 'About' },
    { href: '/Components/products', label: 'Products' },
  ];

  const spaServicesLinks = [
    { href: '/spa-services/body-spa', label: 'Body Spa' },
    { href: '/spa-services/facial-spa', label: 'Facial Spa' },
    { href: '/spa-services/intimate-spa', label: 'Intimate Spa' },
  ];

  const supportLinks = [
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 font-semibold text-center items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-amber-300 transition-colors"
                onClick={closeDropdown}
              >
                {link.label}
              </Link>
            ))}

            {/* Spa-Services Dropdown */}
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
                Spa-Services
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

            {/* Support Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => toggleDropdown('support')}
              onMouseLeave={closeDropdown}
            >
              <button
                className="text-white hover:text-amber-300 transition-colors flex items-center"
                aria-expanded={activeDropdown === 'support'}
                aria-controls="support-menu"
              >
                Support
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

              {activeDropdown === 'support' && (
                <motion.div
                  id="support-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50"
                >
                  {supportLinks.map((link) => (
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
            <Link href="/cart" className="relative text-white hover:text-amber-300 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M17 13l1.6 8M6 21h12"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-amber-300 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>
                <span className="ml-2">Logout</span>
              </button>
            ) : (
              <Link
                href="/Login"
                className="text-white hover:text-amber-300 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                <span className="ml-2">Login</span>
              </Link>
            )}
          </div>

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
              
              {/* Mobile Spa-Services Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => toggleDropdown('mobile-spa')}
                  className="flex items-center justify-between w-full text-white hover:text-amber-300"
                >
                  Spa-Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 transition-transform ${activeDropdown === 'mobile-spa' ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-spa' && (
                  <div className="ml-4 mt-2 space-y-2">
                    {spaServicesLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-1 text-gray-300 hover:text-amber-300"
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Support Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => toggleDropdown('mobile-support')}
                  className="flex items-center justify-between w-full text-white hover:text-amber-300"
                >
                  Support
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 transition-transform ${activeDropdown === 'mobile-support' ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-support' && (
                  <div className="ml-4 mt-2 space-y-2">
                    {supportLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-1 text-gray-300 hover:text-amber-300"
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/cart" 
                className="flex items-center py-2 text-white hover:text-amber-300"
                onClick={toggleMenu}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left py-2 text-white hover:text-amber-300"
                >
                  Logout
                </button>  
              ) : (
                    <Link
                      href="/Login"
                     className="block py-2 text-white hover:text-amber-300"
                               onClick={toggleMenu}
                                 >
                           Login
                       </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;