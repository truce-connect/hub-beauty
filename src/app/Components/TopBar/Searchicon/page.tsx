'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SearchIcon = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative" ref={searchRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="text-amber-400 hover:text-amber-300 focus:outline-none transition-colors duration-200"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </motion.button>
      
      <AnimatePresence>
        {isSearchOpen && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSearch}
            className="absolute left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-sm rounded-md shadow-lg p-3 border border-amber-500/20 z-50"
          >
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products and services..."
                className="w-full px-3 py-2 text-sm bg-gray-800/50 border border-amber-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder-gray-400"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="ml-2 p-2 text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                <FiSearch className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchIcon; 