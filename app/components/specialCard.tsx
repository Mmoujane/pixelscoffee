'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'

interface CardProps {
  parent: string;
  child: string;
  src: string;
  alt: string;
  price: string
}

const SpecialCard: React.FC<CardProps> = ({ parent, child, src, alt, price }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-white rounded-lg shadow-md overflow-hidden">
      
      <motion.div whileHover={{ scale: 1.1}} className="w-full h-48 relative rounded-lg overflow-hidden cursor-pointer">
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      </motion.div>
      <div className='flex flex-col justify-center items-start w-full'>
        <div className="text-lg font-semibold text-gray-800 px-5 pt-2">{parent}</div>
        <div className='w-full flex justify-between items-center px-5 py-1'>
          <div className="text-sm text-gray-600">{child}</div>
          <span className="text-lg font-bold text-brown-600">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default SpecialCard;
