'use client';

import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CartIcon = () => {
  return (
    <Link href="/cart">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="text-amber-400 hover:text-amber-300 focus:outline-none cursor-pointer relative transition-colors duration-200"
        aria-label="Shopping Cart"
      >
        <FiShoppingCart className="w-5 h-5" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
        >
          0
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default CartIcon; 