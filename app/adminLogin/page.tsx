"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // backend call

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        sessionStorage.setItem('token', result.token);
        alert('autheticate successfully!');
        router.push('/admin');
      } else {
        alert(result.message || 'Failed to authenticate');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-brown-600 mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-brown-600 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;