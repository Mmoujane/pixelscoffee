'use client'

import React, { useState, useEffect } from "react";
import {motion} from 'framer-motion'

interface SpecialProps {
    id: string
  }

const AddSpecial: React.FC<SpecialProps> = ({ id }) => {

    const [price, setPrice] = useState(''); 
    const handleSubmit = async () => {
        console.log(id);
        
        // Basic validation
        if (!price || !id) {
            alert('all field are required');
            return;
        }
        // backend call
    
        try {
            const response = await fetch('/api/addSpecialOffer', {
            method: 'POST',
            body: JSON.stringify({id, price})
            });
    
            const result = await response.json();
            console.log(result)
            if (response.ok) {
            alert('Special product added successfully!');
            } else {
            alert(result.message || 'Failed to add Special product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
        
    };
  
    return (
        <div className="flex justify-center items-center p-3 bg-white gap-3 rounded-lg shadow-md">
            <div className="flex justify-center items-center gap-3">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    change price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="price"
                className="p-3 border border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 text-white px-6 py-2  rounded-full text-sm md:text-lg hover:bg-orange-700 transition-colors"
               onClick={handleSubmit}
            >
              update
            </motion.button>
        </div>
    );
  };

export default AddSpecial;