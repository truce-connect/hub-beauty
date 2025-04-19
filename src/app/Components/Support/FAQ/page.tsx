// components/FAQ.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const faqData = [
  {
    category: "Product & Ingredients",
    items: [
      {
        question: "What skin types are your products suitable for?",
        answer: "Our products are formulated for all skin types including oily, dry, combination, and sensitive skin."
      },
      {
        question: "Are your products cruelty-free and vegan?",
        answer: "Yes! We&apos;re 100% cruelty-free and many products are vegan-friendly."
      },
      {
        question: "What are the main active ingredients in your products?",
        answer: "Our products feature scientifically-proven ingredients like Glutathione, Vitamin C, Hyaluronic Acid, and natural extracts."
      }
    ]
  },
  {
    category: "Usage & Results",
    items: [
      {
        question: "How long until I see results?",
        answer: "Most customers notice improvements in 2-4 weeks with daily use."
      },
      {
        question: "Can I use with other skincare brands?",
        answer: "Yes, our products complement most regimens. Always patch-test first."
      },
      {
        question: "What is the recommended skincare routine?",
        answer: "We recommend cleansing, toning, treating, and moisturizing. Specific routines can be customized based on your skin needs."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer: "Domestic orders typically arrive in 3-5 business days. International shipping may take 7-14 business days."
      },
      {
        question: "Do you offer returns?",
        answer: "Yes, we offer a 30-day satisfaction guarantee on all products."
      }
    ]
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-amber-500/20 py-4 last:border-none"
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between group"
      >
        <h3 className="text-left text-lg font-medium text-amber-500 group-hover:text-amber-400 transition-colors">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="ml-4 text-amber-500 group-hover:text-amber-400 transition-colors"
        >
          <FiChevronDown size={24} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
      <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-300 leading-relaxed">{answer}</p>
      </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredData = faqData.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/50" size={20} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-amber-500/20 rounded-lg text-amber-500 placeholder-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {faqData.map((section) => (
            <button
              key={section.category}
              onClick={() => setActiveCategory(curr => curr === section.category ? null : section.category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === section.category
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-gray-800/50 text-amber-500 hover:bg-gray-700/50'
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>

        {filteredData.map((section, index) => (
          activeCategory === null || activeCategory === section.category ? (
            <motion.div 
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-amber-500">
                {section.category}
              </h3>
              <div className="rounded-lg bg-gray-800/50 backdrop-blur-sm p-6 shadow-lg border border-amber-500/10">
                {section.items.map((item) => (
      <FAQItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
      />
                ))}
    </div>
  </motion.div>
          ) : null
        ))}

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-amber-500">No matching questions found.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}