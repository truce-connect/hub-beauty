'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchIcon from './Searchicon/page';
import LoginIcon from './Login/page';
import CartIcon from './Carticon/page';

const TopBar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-500/20 shadow-lg backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-28">
          {/* Left side - Search */}
          <div className="flex items-center">
            <div className="scale-125">
              <SearchIcon />
            </div>
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