import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import { motion } from 'framer-motion';
import { FaTimes  } from 'react-icons/fa';
import AddSpecial from "./AddSpecial";

const SpecialProductsSection: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [display, setDisplay] = useState(false);
    const [ProductId, setProductId] = useState('');
    
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
        }
    
        fetchData();
      }, []);

      const handleClickOnAdd = (id: string) => {
        setDisplay(!display);
        setProductId(id);
      }

      const handleDelete = async (id: string) => {
        console.log(id);
        
        // Basic validation
        if (!id) {
            alert('id is required');
            return;
        }
        // backend call
    
        try {
            const response = await fetch('/api/deleteSpecialOffer', {
            method: 'POST',
            body: JSON.stringify({id})
            });
    
            const result = await response.json();
            console.log(result)
            if (response.ok) {
            alert('Special product deleted successfully!');
            } else {
            alert(result.message || 'Failed to delete Special product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
        
      };
  
    return (
      <div>
        <div className= {`w-screen h-screen bg-transparent z-20 fixed top-0 left-0 backdrop-blur-sm ${display ? 'flex': 'hidden'} justify-center items-center`}>
          <FaTimes className="text-xl text-gray-600 cursor-pointer fixed top-6 right-14 z-40" onClick={() => handleClickOnAdd('')}/>
          <AddSpecial id={ProductId}/>
        </div>
      <div className="hidden md:block">
        <h2 className="text-2xl font-bold text-brown-600 mb-6">Special Offers</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Price</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-600">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.specialPrice}$</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <button className="ml-4 text-green-600 hover:text-green-700" onClick={() => handleClickOnAdd(product._id)}>add</button>
                    <button className="ml-4 text-red-600 hover:text-red-700" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-4 block md:hidden">
      <h2 className="text-2xl font-bold text-brown-600 mb-6">Special Offers</h2>
      <div className="space-y-4">
        {products.map((product: any, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-brown-600">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.specialPrice}$</p>
              </div>
              <div className="flex space-x-4">
                <button className="text-green-600 hover:text-green-700" onClick={() => handleClickOnAdd(product._id)}>Add</button>
                <button className="text-red-600 hover:text-red-700" onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

      
    );
  };


export default SpecialProductsSection;
