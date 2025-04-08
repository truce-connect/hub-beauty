'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  productName?: string;
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  isVisible, 
  onClose,
  productName 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 bg-gray-800 border border-amber-500/30 rounded-lg shadow-lg p-4 max-w-md"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-white">
                {productName ? `${productName} added to cart!` : message}
              </p>
              <div className="mt-2 flex space-x-3">
                <Link href="/cart">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View Cart
                  </motion.button>
                </Link>
                <button
                  onClick={onClose}
                  className="text-xs font-medium text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 