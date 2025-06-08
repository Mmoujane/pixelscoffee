'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardSection from '../components/Dashboard';
import SpecialProductsSection from '../components/SpecialProducts';
import BookingRequestsSection from '../components/BookingRequests';
import AddProductSection from '../components/AddProducts';
import AddBlogSection from '../components/AddBlog';
import TrendingProductsSection from '../components/TrendingProduct';

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar desktop */}
      <div className="w-64 bg-white hidden md:block shadow-lg mt-16">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-brown-600">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="#dashboard">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'dashboard' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Dashboard
            </button>
          </Link>
          <Link href="#products">
            <button
              onClick={() => setActiveSection('products')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'products' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Special Products
            </button>
          </Link>
          <Link href="#Trendingproducts">
            <button
              onClick={() => setActiveSection('TrendingProducts')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'TrendingProducts' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Trending Products
            </button>
          </Link>
          <Link href="#bookings">
            <button
              onClick={() => setActiveSection('bookings')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'bookings' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Booking Requests
            </button>
          </Link>
          <Link href="#add-product">
            <button
              onClick={() => setActiveSection('add-product')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'add-product' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Add New Product
            </button>
          </Link>
          <Link href="#add-blog">
            <button
              onClick={() => setActiveSection('add-blog')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'add-blog' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Add New Blog
            </button>
          </Link>
        </nav>
      </div>

      <div className='w-full flex flex-col md:hidden justify-center items-center mt-16'>
        <div className="p-6 w-full flex justify-center items-center">
          <h1 className="text-2xl font-bold text-brown-600">Admin Panel</h1>
        </div>
        <nav className="mt-6 flex flex-wrap justify-center items-center w-full">
          <Link href="#dashboard">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'dashboard' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Dashboard
            </button>
          </Link>
          <Link href="#products">
            <button
              onClick={() => setActiveSection('products')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'products' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Special Products
            </button>
          </Link>
          <Link href="#Trendingproducts">
            <button
              onClick={() => setActiveSection('TrendingProducts')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'TrendingProducts' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Trending Products
            </button>
          </Link>
          <Link href="#bookings">
            <button
              onClick={() => setActiveSection('bookings')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'bookings' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Booking Requests
            </button>
          </Link>
          <Link href="#add-product">
            <button
              onClick={() => setActiveSection('add-product')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'add-product' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Add New Product
            </button>
          </Link>
          <Link href="#add-blog">
            <button
              onClick={() => setActiveSection('add-blog')}
              className={`w-full text-left px-6 py-3 ${
                activeSection === 'add-blog' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              } hover:bg-orange-100 hover:text-orange-600`}
            >
              Add New Blog
            </button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-20 px-8">
        {activeSection === 'dashboard' && <DashboardSection />}
        {activeSection === 'products' && <SpecialProductsSection />}
        {activeSection === 'TrendingProducts' && <TrendingProductsSection />}
        {activeSection === 'bookings' && <BookingRequestsSection />}
        {activeSection === 'add-product' && <AddProductSection />}
        {activeSection === 'add-blog' && <AddBlogSection />}
      </div>
    </div>
  );
};

export default AdminPage;