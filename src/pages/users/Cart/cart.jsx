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
    <Container>
      <CartContainer>
      {cart.items.map((item) => (
        <div key={item.productId} className="cart-item">
          <div className="product-image-pill">
          <img src={`https://bala-canvas.onrender.com/${item.productimage}`} alt={item.productname} />
          </div>
          <div className="product-name">
          <h3>{item.productname}</h3>
          </div>
          <div className="product-name">
          <h3>{item.size}</h3>
          </div>
          <AmountContainer className='quantity'>
            <Remove onClick={() => handleQuantity(item.productId, item.quantity - 1)} />
            <Amount>{item.quantity}</Amount>
            <Add onClick={() => handleQuantity(item.productId, item.quantity + 1)} />
          </AmountContainer>
          <div className="total">
          <p> Price: UGX{item.price * item.quantity}</p>
          </div>
          <button onClick={() => handleRemoveItem(item.productId)} className='trash'><Trash size={32} /></button>
        </div>
      ))}
     </CartContainer>
     <div className='shipping'>
        <div className="total-price">
        Sub Total: UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        <h4>Shipping: UGX 10,000</h4>
        <h3>Total: UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity , 0)+10000}</h3>
        </div>
        <button className='order-btn' onClick={() =>handleCheckout (cart)}>ORDER NOW</button>
        </div>
      </Container>
      <div className='continue-shopping'>
        <button>
          <Link to="/">Continue Shopping</Link>
        </button>
        </div>
      </>
  );
};

