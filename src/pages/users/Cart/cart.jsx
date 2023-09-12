import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Remove, Add } from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from "react-router-dom"
import { updateQuantity, removeFromCart } from '../reducers/cartSlice';
import './cart.css';

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
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
const CheckoutButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;
const Form = styled.form`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid teal;
  padding: 10px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const CheckoutButtonWrapper = styled.div`
  float: right;
`;

export const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handleCheckout = () => {
    const productName = cart.items.map(item => item.productname).join(', ');
    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const username = event.target.elements.username.value;
    const phonenumber = event.target.elements.phonenumber.value;
    axios.post('http://localhost:3007/checkout', {
      productName,
      totalPrice,
      quantity,
      username,
      phonenumber,
    })
    .then(response => {
      if (response.status === 200) {
        alert('Your order has been received successfully!');
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
};


  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.items.map((item) => (
        <div
          key={item.productId}
          className="cart-item"
        >
          <div className="product-image-pill">
          <img src={`http://localhost:3007/${item.productimage}`} alt={item.productname} />
          </div>
          <div className="product-name">
          <h3>{item.productname}</h3>
          </div>
          <AmountContainer className='quantity'>
            <Remove onClick={() => handleQuantity(item.productId, item.quantity - 1)} />
            <Amount>{item.quantity}</Amount>
            <Add onClick={() => handleQuantity(item.productId, item.quantity + 1)} />
          </AmountContainer>
          <div className="total">
          <p> Price: UGX{item.price * item.quantity}</p>
          </div>
          <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
        </div>
      ))}
      <div className="total-price">
        Total Price: UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </div>
      <button>
        <Link  to='/'>Continue Shopping</Link>
      </button>
      <CheckoutButtonWrapper>
<CheckoutButton onClick={handleCheckout}>Order Now</CheckoutButton>
</CheckoutButtonWrapper>
    </div>
  );
};
