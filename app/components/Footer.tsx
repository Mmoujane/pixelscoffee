import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-900">About Us</h3>
            <p className="text-sm text-gray-600">
              At PixelsCoffee, we are passionate about delivering the finest coffee experience. Join us for a cozy and memorable time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-900">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#home" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#booking" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  Booking
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-gray-600">123 Coffee Street, City</li>
              <li className="text-sm text-gray-600">Phone: +1 234 567 890</li>
              <li className="text-sm text-gray-600">Email: info@pixelscoffee.com</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-900">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-orange-600 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-orange-600 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-orange-600 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-orange-600 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PixelsCoffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;