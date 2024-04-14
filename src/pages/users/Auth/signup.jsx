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
      navigate('/signup');
      console.error('Signup failed:', error.message);
    }

  };


    return (
<div className="App">
      <div className="login-container">
        <img src="/signup.gif" alt="Login GIF" style={{ width: '200px' }} className='w-20 mx-auto mb-5'/>
        <h2 className='text-center text-2xl font-semibold text-gray-600'>Signup</h2>
        <form className="login-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input type="text" className = 'w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300' 
            id="email" 
            required onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="email" className='block mb-2 text-indigo-500'>Email</label>
          </div>
          <div className="input-group">
            <input type="text" className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300' id="phonenumber" required onChange={(e) => setPhoneNumber(e.target.value)}/>
            <label htmlFor="phonenumber" className='block mb-2 text-indigo-500'>Phone Number</label>
          </div>
          <div className="input-group">
            <input type="text" className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300' id="address" required onChange={(e) => setAddress(e.target.value)}/>
            <label htmlFor="address" className='block mb-2 text-indigo-500'>Address</label>
          </div>
          <div className="input-group">
            <input type="password" className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300' id="password" required onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="password" className='block mb-2 text-indigo-500'>Password</label>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
    );
}