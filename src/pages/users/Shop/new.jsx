import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export const NewArrivals = () => {
  const [data, setData] = useState([]);

const fetchData = async () => {
  try {
    const response = await axios.get('https://bala-canvas.onrender.com/shop');
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newProducts = response.data.filter(product => {
      const uploadDate = new Date(product.createdAt);
      return uploadDate > sevenDaysAgo;
    });
    setData(newProducts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
  {data.map((product) => (
    <Link to={`/product/${product._id}`} key={product._id}>
      <motion.div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.03 }}
      >
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
              NEW
      </div>
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
    </section>
  );
};