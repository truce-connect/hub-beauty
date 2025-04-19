// components/SupportNav.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FAQ from "./FAQ/page";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Support = () => {
  const [activeTab, setActiveTab] = useState<"contact" | "faq">("contact");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isClient, setIsClient] = useState(false);

  // Add animated background elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!formData.email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (!formData.message.trim()) {
        throw new Error('Please enter your message');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: <FaWhatsapp size={24} />, 
      href: "https://wa.me/+254712345678",
      label: "Contact us on WhatsApp"
    },
    { 
      icon: <FiFacebook size={24} />, 
      href: "https://facebook.com/skinfix",
      label: "Follow us on Facebook"
    },
    { 
      icon: <FiTwitter size={24} />, 
      href: "https://twitter.com/skinfix",
      label: "Follow us on Twitter"
    },
    { 
      icon: <FiInstagram size={24} />, 
      href: "https://instagram.com/skinfix",
      label: "Follow us on Instagram"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <div className="relative w-full h-full">
            <Image
              src="/images/support-image.jpg"
              alt="Support Background"
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-sm" />
      </div>

      {/* Animated Overlay Elements */}
      <div className="absolute inset-0 z-10">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          transition={{ type: "spring", damping: 50 }}
        />
        <motion.div
          className="absolute right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: mousePosition.x * -0.1,
            y: mousePosition.y * -0.1,
          }}
          transition={{ type: "spring", damping: 50 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4">
            How Can We Help?
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get in touch with our support team or browse our frequently asked questions
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-amber-500 hover:text-amber-400 transition-colors p-4 bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg hover:shadow-amber-500/20"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveTab("contact");
              setIsFormOpen(true);
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm ${
              activeTab === "contact"
                ? "bg-amber-500 text-gray-900"
                : "bg-gray-800/50 text-amber-500 hover:bg-gray-700/50"
            }`}
          >
            Contact Us
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("faq")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm ${
              activeTab === "faq"
                ? "bg-amber-500 text-gray-900"
                : "bg-gray-800/50 text-amber-500 hover:bg-gray-700/50"
            }`}
          >
            FAQ
          </motion.button>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-20"
          >
            {activeTab === "faq" && <FAQ />}
          </motion.div>
        </AnimatePresence>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsFormOpen(false);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 max-w-md w-full relative"
              >
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 text-amber-500 hover:text-amber-400"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium text-amber-500">Name</label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-2 bg-gray-700 border border-amber-500/20 rounded-lg text-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-amber-500/50"
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium text-amber-500">Email</label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-2 bg-gray-700 border border-amber-500/20 rounded-lg text-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-amber-500/50"
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
        </div>
                    <div>
                      <label htmlFor="message" className="block mb-2 font-medium text-amber-500">Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required 
                        rows={4} 
                        className="w-full px-4 py-2 bg-gray-700 border border-amber-500/20 rounded-lg text-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-amber-500/50"
                        placeholder="Your message..."
                        disabled={isSubmitting}
                      />
        </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-amber-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl text-amber-500 font-bold">Thank you!</h3>
                    <p className="text-gray-300">We&apos;ll get back to you soon.</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Support;