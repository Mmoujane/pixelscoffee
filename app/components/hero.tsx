'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="hero pt-24 md:pt-0" id='home'>
      <div className="flex flex-row justify-between items-center px-4 md:px-10 w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-1/2 max-w-md text-left mb-8 md:mb-0"
        >
          <h1 className="text-xl md:text-6xl font-bold mb-4 md:mb-6">
            Welcome to Our Coffee Shop
          </h1>
          <p className="text-sm md:text-xl mb-6 md:mb-8">
            Discover the finest coffee blends and enjoy a cozy atmosphere perfect for relaxing or working.
          </p>
          <a href="#shop">
            <Button text="Explore Menu" />
          </a>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-1/2 flex justify-center items-center"
        >
          <Image
            alt="hero image"
            src="/images/herotest2.jpg"
            width={400} // Adjusted for mobile
            height={400} // Adjusted for mobile
            className="w-full h-auto" // Ensure the image scales proportionally
            style={{ objectFit: 'contain' }} // Prevent cropping
          />
        </motion.div>
      </div>

      {/* Featured Items Section */}
      <div className="w-full bg-orange-50 px-4 md:px-32 py-3 md:py-10">
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-row justify-between items-center gap-0"
        >
          {/* Chocolate Coffee */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col md:flex-row justify-center items-center w-[30%]"
          >
            <div className="rounded-full bg-orange-700 w-14 h-14 md:w-24 md:h-24 flex justify-center items-center cursor-pointer">
              <Image
                alt="cup of coffee"
                src="/images/cappuccino.png"
                width={40}
                height={40}
                className="w-8 h-8 md:w-16 md:h-16"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start md:ml-4">
              <span className="text-sm md:text-base">cappuccino</span>
            </div>
          </motion.div>

          {/* Orange Juice */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col md:flex-row justify-center items-center w-[30%]"
          >
            <div className="rounded-full bg-orange-500 w-14 h-14 md:w-24 md:h-24 flex justify-center items-center cursor-pointer">
              <Image
                alt="orange juice"
                src="/images/espresso.png"
                width={40}
                height={40}
                className="w-8 h-8 md:w-16 md:h-16"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start md:ml-4">
              <span className="text-sm md:text-base">espresso</span>
            </div>
          </motion.div>

          {/* Herbal Tea */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col md:flex-row justify-center items-center w-[30%]"
          >
            <div className="rounded-full bg-orange-300 w-14 h-14 md:w-24 md:h-24 flex justify-center items-center cursor-pointer">
              <Image
                alt="herbal tea"
                src="/images/frappe.png"
                width={40}
                height={40}
                className="w-8 h-8 md:w-16 md:h-16"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start md:ml-4">
              <span className="text-sm md:text-base">frappe</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;