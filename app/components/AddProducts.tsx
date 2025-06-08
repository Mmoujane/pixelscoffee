'use client'

import React, { useState } from "react";

const AddProductSection: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState<File>();

  
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Basic validation
        if (!name || !price || !file) {
          alert('all field are required');
          return;
        }

        const formData = new FormData();
        formData.set('file', file);
        formData.set('name', name);
        formData.set('price', price);
    
        // backend call
    
        try {
          const response = await fetch('/api/addProduct', {
            method: 'POST',
            body: formData
          });
    
          const result = await response.json();
          console.log(result)
          if (response.ok) {
            alert('product added successfully!');
          } else {
            alert(result.message || 'Failed to add product');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred');
        }
        
      };
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-brown-600 mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Add Image</label>
            <input
              type="file"
              className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              onChange={(e) => setFile(e.target.files?.[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Add Product
          </button>
        </form>
      </div>
    );
  };

export default AddProductSection;