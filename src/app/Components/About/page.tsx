'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            About <span className="text-amber-600">SkinFix Beauty Hub</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Your journey to radiant skin begins here
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-amber-100"
          >
            <Image
              src="/images/bb2.jpg"
              alt="SkinFix Beauty Hub Team"
              width={3840}
              height={2160}
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Philosophy */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-amber-100 text-amber-600 p-3 rounded-full mr-4 shadow-inner">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                  Our Philosophy
                </span>
              </h3>
              <p className="text-gray-400 ml-16 pl-1 border-l-2 border-amber-200">
                Where science-backed skincare meets holistic wellness for
                transformative results.
              </p>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-amber-50">
                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                  <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3 shadow-inner">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                    Signature Services
                  </span>
                </h4>
                <ul className="space-y-3 text-gray-700 ml-12 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-50 text-amber-600 p-1.5 rounded-full mt-0.5 shadow-inner">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Medical-grade facial treatments
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-50 text-amber-600 p-1.5 rounded-full mt-0.5 shadow-inner">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Customized acne solutions
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-50 text-amber-600 p-1.5 rounded-full mt-0.5 shadow-inner">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Anti-aging protocols
                  </li>
                </ul>
              </div>

              {/* Team */}
              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-amber-50">
                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                  <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3 shadow-inner">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                    Expert Team
                  </span>
                </h4>
                <p className="text-gray-700 ml-12 pl-2 border-l-2 border-amber-200">
                  Licensed dermatologists and estheticians with specialized
                  training in clinical skincare.
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="ml-12">
              <Link href="/Support/Contact" passHref legacyBehavior>
                <a>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Book Consultation
                  </motion.button>
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;