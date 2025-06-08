'use client'

import React from 'react';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Blog: React.FC = () => {

    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch("/api/blogs");
          const result = await res.json();
          if (res.ok){
          console.log(result);
          setBlogs(result.blog);
          }else{
            alert(result.message || 'Failed to fetch blogs');
          }
  
        } catch (err) {
          console.error('Error:', err);
          alert('An error occurred');
        }
      }
  
      fetchData();
    }, []);

  return (
    <div className="w-full p-5 flex justify-center items-center bg-orange-50" id='blog'>
      <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 2 }}
    viewport={{ once: true, margin: '-100px' }} className="w-full max-w-7xl flex flex-col justify-center items-center gap-8 mt-10">
        {/* Blog Header */}
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Our Blog</h1>
          <p className="text-lg text-gray-600 text-center">
            Discover the latest stories, tips, and news about coffee and our shop.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any, index) => (
              <BlogCard
              Blogtitle={blog.title}
              pg={blog.content}
              Blogimage={blog.image}
              Blogalt={blog.title}
              key={index}
              id={blog._id}
            />
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
