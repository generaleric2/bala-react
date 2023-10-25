import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';

import axios from 'axios';
import './shop.css';

export const Shop = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bala-canvas.onrender.com//shop');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    const itemToAdd = {
      productId: product._id,
      quantity: 1,
      price: product.price,
      productimage: product.productimage,
      productname: product.productname,
    };

    dispatch(addToCart(itemToAdd));
  };


  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Your Home Of Premium Sneakers</h1>
      </div>
      <div className="products">
        {data.map((product) => (
          <div key={product._id} className="product">
            <img src={`https://bala-canvas.onrender.com//${product.productimage}`} alt="product" />
              <h5 className='product-name'>{product.productname}</h5>
              <p className="card-text">UGX{product.price}</p>
            <button className="addToCart" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};




