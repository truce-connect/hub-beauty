import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/logos.png"
              alt="Skin_fix_ beauty-hub"
              width={150}
              height={50}
              className="h-auto"
            />
            <p className="text-sm">
              Your premier destination for beauty and wellness. Experience luxury spa treatments and premium skincare products.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-amber-500 hover:text-amber-600 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-amber-500 hover:text-amber-600 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-amber-500 hover:text-amber-600 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-amber-500 hover:text-amber-600 transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Spa-services" className="hover:text-amber-500 transition-colors">
                  Spa Services
                </Link>
              </li>
              <li>
                <Link href="/wrapper" className="hover:text-amber-500 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-amber-500 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/SupportNav" className="hover:text-amber-500 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Spa-services/Facial-spa" className="hover:text-amber-500 transition-colors">
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link href="/Spa-services/Body-Spa-Treatments" className="hover:text-amber-500 transition-colors">
                  Body Treatments
                </Link>
              </li>
              <li>
                <Link href="/Spa-services/Intimate-Care" className="hover:text-amber-500 transition-colors">
                  Intimate Care
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-500 transition-colors">
                  Special Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Address:</span>
                  123 Beauty Street, London, UK
                </p>
              </li>
              <li>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Phone:</span>
                  +44 123 456 7890
                </p>
              </li>
              <li>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Email:</span>
                  info@skinfix.com
                </p>
              </li>
              <li>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Hours:</span>
                  Mon-Sat: 9AM - 8PM
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-amber-500 mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay updated with our latest offers, treatments, and beauty tips.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2024 Skin Fix Beauty Hub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-amber-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-amber-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}