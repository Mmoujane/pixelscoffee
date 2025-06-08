'use client';

import React from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCoffee } from 'react-icons/fa';
import SpecialCard from './specialCard';
import TrendingCard from './TrendingCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';



const Shop: React.FC = () => {

  const [products, setProducts] = useState([]);
  const [Specialproducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/products");
        const result = await res.json();
        if (res.ok){
        console.log(result.products[0]);
        setProducts(result.products);
        }else{
          alert(result.message || 'Failed to fetch product');
        }

      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred');
      }

      try {
        const res = await fetch("/api/specialProducts");
        const result = await res.json();
        if (res.ok){
        console.log(result.products[0]);
        setSpecialProducts(result.products);
        }else{
          alert(result.message || 'Failed to fetch product');
        }

      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-full p-5 flex justify-center items-center bg-background" id='shop'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true, margin: '-100px' }} // Add margin to trigger animation
        className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start gap-8 mt-10"
      >
        {/* Special Offers Section */}
        <div
          // Add margin to trigger animation
          className="w-full md:w-[30%] flex flex-col justify-center items-center bg-white px-10 py-6 rounded-lg shadow-md gap-4"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <FaCoffee className="text-2xl text-brown-600" />
            <span className="text-xl font-semibold text-gray-800">Special Offers</span>
          </div>
          {Specialproducts.map((SpecialProduct: any, index) => (
              <SpecialCard key={index} parent="Coffee" child={SpecialProduct.name} alt={'coffee' + SpecialProduct.name} src={SpecialProduct.image} price={SpecialProduct.specialPrice + '$'} />
            ))}
        </div>

        {/* Trending Products Section */}
        <div
           // Add margin to trigger animation
          className="w-full md:w-[65%] flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex w-full justify-between items-center mb-6">
            <div className="flex justify-center items-center gap-2">
              <FaCoffee className="text-2xl text-brown-600" />
              <span className="text-xl font-semibold text-gray-800">Trending Products</span>
            </div>
            <div className="flex justify-center items-center gap-4">
              <FaArrowAltCircleLeft className="text-2xl text-gray-600 cursor-pointer hover:text-brown-600" />
              <FaArrowAltCircleRight className="text-2xl text-gray-600 cursor-pointer hover:text-brown-600" />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any, index) => (
              <TrendingCard key={index} name={product.name} price={product.price + '$'} image={product.image} idProduct={product._id}/>
            ))}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;