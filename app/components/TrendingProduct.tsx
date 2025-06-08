import React from "react";
import { useState, useEffect } from "react";

const TrendingProductsSection: React.FC = () => {
    
    const [TrendProducts, setTrendProducts] = useState([]);
      
        useEffect(() => {
          async function fetchData() {
            try {
              const res = await fetch("/api/trending");
              const result = await res.json();
              if (res.ok){
              console.log(result.products);
              setTrendProducts(result.products);
              }else{
                alert(result.message || 'Failed to fetch trend Products');
              }
      
            } catch (err) {
              console.error('Error:', err);
              alert('An error occurred');
            }
          }
      
          fetchData();
        }, []);
  
    return (
    <div>
      <div className="hidden md:block">
        <h2 className="text-2xl font-bold text-brown-600 mb-6">Trending Products</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">Price</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-brown-600">likes</th>
              </tr>
            </thead>
            <tbody>
              {TrendProducts.map((product: any, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-600">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.price}$</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-4 block md:hidden">
      <h2 className="text-2xl font-bold text-brown-600 mb-6">Trending Products</h2>
      <div className="space-y-4">
        {TrendProducts.map((product: any, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-brown-600">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.price}$</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">likes: {product.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    );
  };


export default TrendingProductsSection;
