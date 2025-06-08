'use client'

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CardProps {
  name: string;
  price: string;
  image: string; // Add image prop for background
  idProduct: string
}

const TrendingCard: React.FC<CardProps> = ({ name, price, image, idProduct }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white rounded-lg shadow-md overflow-hidden" id={idProduct}>
      {/* Background Image */}
      <motion.div whileHover={{ scale: 1.1}} className="w-full h-48 relative cursor-pointer">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </motion.div>

      {/* Content */}
      <div className="w-full flex flex-col justify-center items-start p-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">{name}</span>
          <FaHeart className="text-xl text-gray-600 cursor-pointer hover:text-red-500" />
        </div>
        <span className="text-lg font-bold text-brown-600">{price}</span>
      </div>
    </div>
  );
};

export default TrendingCard;
