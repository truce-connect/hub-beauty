'use client';

import React from 'react';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Login= () => {
  return (
    <Link href="/login">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="text-amber-400 hover:text-amber-300 focus:outline-none cursor-pointer transition-colors duration-200"
        aria-label="Login"
      >
        <FiUser className="w-5 h-5" />
      </motion.div>
    </Link>
  );
};

export default Login; 