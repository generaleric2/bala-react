import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Signup=()=> {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bala-canvas.onrender.com/customersignup', {
        username,
        address,
        phonenumber,
        email,
        password,
      });

      alert('Signup Successful', 'You can now login with your credentials.');
      navigate('/login');
    } catch (error) {
      alert('Signup Failed', 'Please check your details and try again.');
      console.error('Signup failed:', error.message);
    }

  };


    return (
<div className="App">
      <div className="login-container">
        <img src="/signup.gif" alt="Login GIF" style={{ width: '200px' }} />
        <h2>Signup</h2>
        <form className="login-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input type="text" id="email" required onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input type="text" id="phonenumber" required onChange={(e) => setPhoneNumber(e.target.value)}/>
            <label htmlFor="phonenumber">Phone Number</label>
          </div>
          <div className="input-group">
            <input type="text" id="address" required onChange={(e) => setAddress(e.target.value)}/>
            <label htmlFor="address">Address</label>
          </div>
          <div className="input-group">
            <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-group">
            <input type="username" id="username" required onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password">Username</label>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
    );
}