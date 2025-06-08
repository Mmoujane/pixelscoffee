'use client'

import React from 'react';
import { FaCoffee } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CardProps {
  Blogtitle: string;
  pg: string;
  Blogimage: string;
  Blogalt: string;
  id: string;
}

const BlogCard: React.FC<CardProps> = ({ Blogtitle, pg, Blogimage, Blogalt, id }) => {
  return (
    <Link href={`/blog/${id}`}>
    <motion.div whileHover={{ scale: 1.05}} className="flex flex-col w-full justify-center items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Blog Image */}
      <div className="w-full h-48 relative">
        <Image src={Blogimage} alt={Blogalt} layout="fill" objectFit="cover" />
      </div>

      {/* Blog Content */}
      <div className="w-full flex flex-col justify-center items-start p-6 gap-4">
        <h2 className="text-xl font-bold text-brown-600">{Blogtitle}</h2>
        <p className="text-sm text-gray-600">{pg.substring(0, 70)}...</p>
        <div className="flex justify-center items-center gap-2">
          <FaCoffee className="text-brown-600" />
          <span className="text-sm text-gray-600">PixelsCoffee</span>
        </div>
      </div>
    </motion.div>
    </Link>
    
  );
};

export default BlogCard;