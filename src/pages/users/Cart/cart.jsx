import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Remove, Add} from '@mui/icons-material';
import {Trash} from "phosphor-react"
import axios from 'axios';
import { updateQuantity, removeFromCart, clearCart } from '../reducers/cartSlice';
import {Nav} from '../../../components/Nav'
import './cart.css';


export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("Cart Items:", cart.items);
  const dispatch = useDispatch();

  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

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
<>
      <Nav />
      <div className="h-screen py-10 my-20" style={{ backgroundColor: '#fff' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-full">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-4">
                <table className="w-full md:table-auto">
                 <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.productId} className="flex flex-col md:flex-row">
                        <td className="py-4 md:py-0">
                          <div className="flex items-center">
                            <img className="h-16 w-16 mr-4 md:mr-0" src={`https://bala-canvas.onrender.com/${item.productimage}`} alt={item.productname} />
                            <span className="font-semibold">{item.productname}</span>
                          </div>
                        </td>
                        <td className="py-4 md:py-0">
                          <div className="flex items-center justify-center md:justify-start">
                            <Remove onClick={() => handleQuantity(item.productId, item.quantity - 1)} />
                            <span className="mx-2">{item.quantity}</span>
                            <Add onClick={() => handleQuantity(item.productId, item.quantity + 1)} />
                          </div>
                        </td>
                        <td className="py-4 ml-10 md:ml-0">UGX{item.price * item.quantity}</td>
                        <td className="py-4 md:py-0">
                          <button onClick={() => handleRemoveItem(item.productId)} className='bg-red-200 p-2 rounded-lg'>
                            <Trash size={32} />
                          </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
                </table>
              </div>
            </div>
            <div className="w-full md:w-full">
              <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Summary</h2>
                <div className="flex justify-between mb-2">
                 <span className='summary-text text-center'>Subtotal</span>
                 <span>UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between mb-2">
                 <span>Shipping</span>
                 <span>UGX 10,000</span>
                </div>
                <hr className="my-2"/>
                <div className="flex justify-between mb-2">
                 <span className="font-semibold">Total</span>
                 <span className="font-semibold">UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity , 0)+10000}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full sm:w-auto" onClick={() => handleCheckout(cart)}>ORDER NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
 );
};