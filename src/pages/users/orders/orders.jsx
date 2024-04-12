import React, { useEffect, useState } from 'react';
import { Nav } from '../../../components/Nav';
import axios from 'axios'

export const Orders = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const storedIdToken = localStorage.getItem('idToken');
      const storedUid = localStorage.getItem('uid');
      if (storedIdToken && storedUid) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const fetchOrders = async () => {
      const uid = localStorage.getItem('uid');
      if (!uid) return;
  
      try {
        const response = await axios.get(`https://bala-canvas.onrender.com/customers/${uid}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders. Please try again later.');
      }
    };
  
    useEffect(() => {
      if (isLoggedIn) {
        fetchOrders();
      }
    }, [isLoggedIn]);
      
    return (
        <div>
          <Nav />
          {isLoggedIn ? (
            orders.map((order, index) => (
              <div key={index} style={{ padding: 10, margin: 10, border: '1px solid lightgray', borderRadius: 8 }} className='cart-item'>
                <p style={{ fontSize: 16, fontWeight: 'bold', color: '#008080' }}>{order.productName}</p>
                <p style={{ fontSize: 16, fontWeight: 'bold' }}>{order.totalPrice}</p>
                <p style={{ fontSize: 12 }}>{new Date(order.date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <button><a href='/login'></a>
              LOGIN
            </button>
          )}
        </div>
      );
};
