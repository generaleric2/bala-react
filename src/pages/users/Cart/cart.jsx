import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import { updateQuantity, removeFromCart, clearCart } from '../reducers/cartSlice';
import {Nav} from '../../../components/Nav'
import './cart.css';


export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("Cart Items:", cart.items);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    const storedIdToken = localStorage.getItem('idToken');
    const storedUid = localStorage.getItem('uid');
    if (storedIdToken && storedUid) {
      setIsLoggedIn(true);
    }
 }, []);

  const handleCheckout = async (cart) => {
    const productName = cart.items ? cart.items.map((item) => item.productname).join(', ') : '';
    const size = cart.items ? cart.items.map((item) => item.size).join(', ') : '';
    const totalPrice = cart.items
      ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
    const quantity = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const uid = localStorage.getItem('uid');
    const idToken = localStorage.getItem('idToken');

    try {
      if (!uid || !idToken) {
        console.error('UID or idToken not found.');
        return;
      }
      const response = await axios.post('https://bala-canvas.onrender.com/checkout', {
        productName,
        totalPrice,
        quantity,
        size,
        uid,
      });

      if (response.status === 200) {
        alert('Your order has been received successfully!');
        dispatch(clearCart());
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="h-screen pt-20" style={{ backgroundColor: '#fff' }}>
          <Nav />
          {isLoggedIn ? (
             <>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.items.map((item) => (
              <div key={item.productId} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={`https://bala-canvas.onrender.com/${item.productimage}`} alt={item.productname} className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                 <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{item.productname}</h2>
                    <p className="mt-1 text-xs text-gray-700">{item.size}</p>
                 </div>
                 <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleQuantity(item.productId, item.quantity - 1)} > - </span>
                      <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.quantity} min="1" onChange={(e) => handleQuantity(item.productId, e.target.value)} />
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleQuantity(item.productId, item.quantity + 1)}> + </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">UGX: {item.price * item.quantity}</p>
                      <button onClick={() => handleRemoveItem(item.productId)} className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                 </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">UGX 10,000</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + 10000}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => handleCheckout(cart)}>ORDER NOW</button>
          </div>
        </div>
        </>
      ) : (
      <div className="flex items-center justify-center h-screen">
      <Link
          to="/login"
          className="block px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-700 focus:outline-none"
      >
          Login
      </Link>
      </div>
      )}
      </div>
 );
};