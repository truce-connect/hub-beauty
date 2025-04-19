'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; status: string }>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Mock authentication logic (replace with actual API call)
      if (email === 'user@example.com' && password === 'password') {
        const user = { id: 1, email };
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        await fetchCartItems(user.id); // Fetch cart items for the logged-in user
        router.push('/'); // Redirect after successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('An error occurred during login:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  // Fetch cart items for the logged-in user
  const fetchCartItems = async (userId: number) => {
    try {
      // Replace mock data with an actual API call
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();

      // Filter cart items to show only "accepted" or "bought" products
      const filteredCartItems = data.filter(
        (item: { status: string }) => item.status === 'accepted' || item.status === 'bought'
      );
      setCartItems(filteredCartItems);
    } catch (err) {
      console.error('Failed to fetch cart items:', err);
      setCartItems([]);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCartItems([]);
    router.push('/'); // Redirect to the homepage
  };

  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;

        const user = JSON.parse(userString);
        if (user) {
          setIsLoggedIn(true);
          await fetchCartItems(user.id);
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
      }
    };

    checkAuth();

    // Listen for storage events to sync across tabs
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {!isLoggedIn ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <span className="font-medium">{item.name}</span>
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-semibold ${
                      item.status === 'accepted'
                        ? 'bg-amber-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {item.status === 'accepted' ? 'Accepted' : 'Bought'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-8">No items in your cart.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;