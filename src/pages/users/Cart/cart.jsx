import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Remove, Add} from '@mui/icons-material';
import {Trash} from "phosphor-react"
import styled from 'styled-components';
import axios from 'axios';
import {Link} from "react-router-dom"
import { updateQuantity, removeFromCart, clearCart } from '../reducers/cartSlice';
import {Nav} from '../../../components/Nav'
import './cart.css';

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 900px;
  margin-left: 140px;
  margin: 0 auto;
  padding: 20px;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

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
      <div className="h-screen py-10 my-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-7/12">
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
            <div className="w-full md:w-5/12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                 <span>Subtotal</span>
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
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={() => handleCheckout(cart)}>ORDER NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
 );
};