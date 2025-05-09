import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css"; // Ensure this file exists and is correctly configured
import { CartProvider } from './Components/Navbar/context/CartProvider';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Beauty Hub - Luxury Beauty Products & Spa Services",
  description: "Discover premium beauty products and luxurious spa services at Beauty Hub. Transform your beauty routine with our curated collection of skincare, haircare, and body care products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${poppins.variable} font-poppins bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white antialiased`}>
        {/* Ensure CartProvider wraps the entire application */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}