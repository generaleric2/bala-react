import React, { useEffect, useState } from 'react';
import  {Nav}  from '../../../components/Nav'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './categories.css';

export const Men = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bala-canvas.onrender.com/category/men');
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
      <div className="products">
        {data.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
          <motion.div key={product._id} className="product" whileHover={{
            scale: 1.2,
          }}>
            <div className='pdtimage'>
            <img src={`https://bala-canvas.onrender.com/${product.productimage}`} alt="product" />
            </div>
              <h5 className='product-name'>{product.productname}</h5>
              <p className="card-text">UGX{product.price}</p>
          </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};




