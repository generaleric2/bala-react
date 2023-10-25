import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Remove, Add, Event } from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';
import {Form} from 'react-bootstrap'
import {Link} from "react-router-dom"
import { updateQuantity, removeFromCart } from '../reducers/cartSlice';
import './cart.css';

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 800px;
  margin-left: 40px;
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
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
const CheckoutButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 50%;
  border-radius: 10px;
  border: 1px solid teal;
  padding: 10px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const CheckoutButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [username, setUsername] = useState([]);
  const [phonenumber, setPhonenumber] = useState([]);
  const [address, setAddress] = useState([]);

  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handleCheckout = (cart, username, phonenumber, address) => {
    const productName = cart.items.map(item => item.productname).join(', ');
    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  
    axios.post('https://bala-canvas.onrender.com/checkout', {
      productName,
      totalPrice,
      quantity,
      username,
      phonenumber,
      address,
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
    <>
    <Container>
      <CartContainer>
      {cart.items.map((item) => (
        <div
          key={item.productId}
          className="cart-item"
        >
          <div className="product-image-pill">
          <img src={`https://bala-canvas.onrender.com/${item.productimage}`} alt={item.productname} />
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
        Sub Total: UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        <h4>Shipping: UGX 10,000</h4>
        <h3>Total: UGX{cart.items.reduce((acc, item) => acc + item.price * item.quantity , 0)+10000}</h3>
        </div>
     </CartContainer>
        <Form className='form-container' onSubmit={(e) => { e.preventDefault(); handleCheckout(cart, username, phonenumber, address); }}>
          <div className='form-title'>Contact Info</div>
          <div className='form-group'>
          <Label>Username</Label>
        <Input
          type="text"
          id="username"
          value={username}            // Bind value to the state variable
          onChange={(e) => setUsername(e.target.value)} // Update state on input change
        />
          <Label>Phone Number</Label>
        <Input
          type="text"
          id="phonenumber"
          value={phonenumber}         // Bind value to the state variable
          onChange={(e) => setPhonenumber(e.target.value)} // Update state on input change
        />
          <Label>Address</Label>
        <Input
          type="text"
          id="address"
          value={address}             // Bind value to the state variable
          onChange={(e) => setAddress(e.target.value)} // Update state on input change
        />
        </div>
          <div className='order-button'>
          <CheckoutButtonWrapper>
          <CheckoutButton type='submit' >Order Now</CheckoutButton>
          </CheckoutButtonWrapper>
          </div>
        </Form>
      </Container>
      <div className='continue-shopping'>
        <button>
          <Link to="/">Continue Shopping</Link>
        </button>
        </div>
      </>
  );
};

