'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCoffee, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed w-full z-10 backdrop-blur-sm transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isScrolled ? '' : 'border-b-2 border-b-gray-600'}`}>
          {/* Left Side: Logo/Icon */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex justify-center items-center text-2xl font-bold text-black cursor-pointer">
              <FaCoffee className="mr-3" />
              <span>PixelsCoffee</span>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <a href="#home">
              <span
                className={`${
                  isScrolled ? 'text-black' : 'text-black'
                } hover:text-orange-600 cursor-pointer`}
              >
                Home
              </span>
            </a>
            <a href="#shop">
              <span
                className={`${
                  isScrolled ? 'text-black' : 'text-black'
                } hover:text-orange-600 cursor-pointer`}
              >
                Shop
              </span>
            </a>
            <a href="#blog">
              <span
                className={`${
                  isScrolled ? 'text-black' : 'text-black'
                } hover:text-orange-600 cursor-pointer`}
              >
                Blog
              </span>
            </a>
            <a href="#booking">
              <span
                className={`${
                  isScrolled ? 'text-black' : 'text-black'
                } hover:text-orange-600 cursor-pointer`}
              >
                Booking
              </span>
            </a>
          </div>

          {/* Right Side: Search Bar (Desktop) */}
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className={`px-4 py-2 rounded-full ${
                isScrolled ? 'bg-gray-100' : 'bg-white'
              } text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black`}
            />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <a href="#home">
                <span className="text-black hover:text-orange-600 cursor-pointer">Home</span>
              </a>
              <a href="#shop">
                <span className="text-black hover:text-orange-600 cursor-pointer">Shop</span>
              </a>
              <a href="#blog">
                <span className="text-black hover:text-orange-600 cursor-pointer">Blog</span>
              </a>
              <a href="#booking">
                <span className="text-black hover:text-orange-600 cursor-pointer">Booking</span>
              </a>
              {/* Mobile Search Bar */}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-black"
                />
                <FaSearch className="ml-2 text-black" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;