import React, { useState, useEffect } from 'react';
import { Nav } from '../../../components/Nav';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Hero } from './shopComponents';
import { NewArrivals } from './new';
import { Footer } from '../footer/footer';

export const Shop1 = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (category = 'all') => {
    setLoading(true);
    try {
      let url = 'https://bala-canvas.onrender.com/shop';
      
      if (category !== 'all') {
        url = `https://bala-canvas.onrender.com/category/${category}`;
      }
      
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleTabChange = (category) => {
    setActiveTab(category);
    fetchData(category);
  };

  return (
    <div className="min-h-screen bg-white w-screen overflow-x-hidden">
    <Nav />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex overflow-x-auto sm:overflow-visible sm:justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 pb-2 sm:pb-0">
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('all')}
          >
            All Products
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'men' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('men')}
          >
            Men
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'women' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('women')}
          >
            Women
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'children' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleTabChange('sports')}
          >
            Sports
          </button>
        </div>
{/* Products Grid */}
{loading ? (
          <div>Loading...</div>
        ) : (
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
  {data.map((product) => (
    <Link to={`/product/${product._id}`} key={product._id}>
      <motion.div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.03 }}
      >
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img 
            src={product.productimage && Array.isArray(product.productimage) && product.productimage.length > 0 
              ? `https://bala-canvas.onrender.com/${product.productimage[0]}`
              : ''
            } 
            alt={product.productname}
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
            {product.productname}
          </h3>
          <p className="text-lg sm:text-xl font-bold text-gray-900 mt-2">
            UGX {product.price}
          </p>
        </div>
      </motion.div>
    </Link>
  ))}
</div>
)}
      </div>
      <Footer/>
    </div>
  );
};