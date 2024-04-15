import React, { useEffect, useState } from 'react';
import  {Nav}  from '../../../components/Nav'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './categories.css';

export const Women = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bala-canvas.onrender.com/category/women');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="shop pt-20" style={{ backgroundColor: '#fff' }}>
    <Nav />
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {data.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id}>
          <motion.div
            key={product._id}
            className="w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white"
            whileHover={{
              scale: 1.2,
            }}
          >
            <div className="h-80 w-72 object-cover rounded-t-xl">
              <img src={`https://bala-canvas.onrender.com/${product.productimage}`} alt="product" />
            </div>
            <div className="px-4 py-3 w-72">
              <p className="text-lg font-bold text-black truncate block capitalize">{product.productname}</p>
              <div className="flex items-center">
                <p className="text-lg font-bold text-black truncate block capitalize">UGX{product.price}</p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  </div>
);
};




