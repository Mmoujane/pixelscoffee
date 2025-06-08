'use client'

import React from 'react';
import Image from 'next/image';
import BlogCard from './BlogCard';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


interface CardProps {
  slug: string
}

const BlogContent: React.FC<CardProps> = ({ slug }) => {

    const [Blog, setBlog] = useState<{ title?: string; image?: string; content?: string; createdAt?: string }>({});
    const [blogs, setBlogs] = useState([]);
    
          
        useEffect(() => {
            async function fetchData() {
                if (!slug) return;
                try {
                const res = await fetch(`/api/fetchBlog?BlogId=${slug}`);
                const result = await res.json();
                if (res.ok){
                    console.log(result);
                    setBlog(result.blog);
                }else{
                    alert(result.message || 'Failed to fetch blog');
                }
    
                } catch (err) {
                console.error('Error:', err);
                alert('An error occurred');
                }

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
    <div className='w-full flex flex-col justify-center items-center gap-10'>
            <h1 className="md:text-6xl text-3xl font-bold text-gray-900">{Blog.title}</h1>
            <div className='flex flex-col md:flex-row justify-center items-start w-full md:px-2 py-4 gap-4'>
                <div className='flex justify-center flex-col items-center gap-2 w-[95%] md:w-[70%]'>
                    <div className="w-[90%] h-72 relative">
                        <Image src={Blog.image || '/images/ammericano.jpg'} alt={Blog.title || 'Blog Image'} layout="fill" objectFit="cover" className='rounded-lg shadow-md'/>
                    </div>
                    <div className='flex justify-between items-center p-2 w-[90%]'>
                        <div className='text-md text-gray-900'>{Blog.createdAt?.split('T')[0]}</div>
                        <div className='flex items-center justify-center gap-4'>
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
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <p className="text-sm md:text-md text-gray-600">{Blog.content}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center bg-white gap-4 p-3 rounded-lg shadow-md'>
                    {blogs.map((blog: any, index) => (
                        (blog._id !== slug) && (
                            <BlogCard
                                Blogtitle={blog.title}
                                pg={blog.content}
                                Blogimage={blog.image}
                                Blogalt={blog.title}
                                key={index}
                                id={blog._id}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
  );
};

export default BlogContent;
