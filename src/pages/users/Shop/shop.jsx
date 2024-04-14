import React, { useEffect, useState } from 'react';
import  {Nav}  from '../../../components/Nav'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './shop.css';

export const Shop = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bala-canvas.onrender.com/shop');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="shop">
       <Nav />
      <div className="w-fit ms-40 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {data.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
          <motion.div key={product._id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" whileHover={{
            scale: 1.2,
          }}>
            <div className='h-80 w-72 object-cover rounded-t-xl'>
            <img src={`https://bala-canvas.onrender.com/${product.productimage}`} alt="product" />
            </div>
            <div class="px-4 py-3 w-72">
              <p className='text-lg font-bold text-black truncate block capitalize'>{product.productname}</p>
              <div class="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">UGX{product.price}</p>
              </div>
              </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};




