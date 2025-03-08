import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './shop.css';
import { motion } from 'framer-motion';

export const NewArrivals = () => {
  const [data, setData] = useState([]);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null)




  const fetchData = async (category = '') => {
    try {
      const url =
        'https://bala-canvas.onrender.com/shop';
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseDown = (e) => {
    setIsDown(true);
    const slider = e.currentTarget;
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = e.currentTarget;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
        <div
          className="flex overflow-x-scroll gap-4 cursor-grab active:cursor-grabbing scrollbar-hide"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
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
      </div>
    </section>
  );
};