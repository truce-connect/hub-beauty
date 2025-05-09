"use client";

import { useCart } from "@/app/Components/Navbar/context/CartProvider";
import { useState, useEffect } from "react";

// Define the Product type based on your API
interface Product {
  id: string;
  title: string; // API uses 'title'
  price: number;
  image: string; // Added to match CartItem
  description: string; // Added to match CartItem
  category: string; // Added to match CartItem
}

export default function ProductList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products"); // Adjust URL if needed
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error:", err);
      }
    }
    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center">
              <h2>{product.title}</h2>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.title, // Map 'title' to 'name'
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    category: product.category,
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}