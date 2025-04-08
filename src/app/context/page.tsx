'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the product type
export interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  category?: string;
}

// Define the cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

// Create the context with a default value
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Calculate cart count and total price
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => {
    // Convert price string to number by removing the £ symbol and parsing
    const priceValue = parseFloat(item.product.price.replace('£', ''));
    return total + (priceValue * item.quantity);
  }, 0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If the product is already in the cart, increase its quantity
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If the product is not in the cart, add it with quantity 1
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => useContext(CartContext);