import React, { useEffect, useState } from 'react';
import { Nav } from '../../../components/Nav';
import axios from 'axios'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

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
      
  
    if (orders.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Nav />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order._id.slice(-6)}
                      </h3>

                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.products && order.products.map((product, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {product.productName} x {product.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-lg font-bold text-gray-900">
                        UGX {order.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
