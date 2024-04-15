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
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#fff' }}>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <img src="/signup.gif" alt="Signup GIF" className='w-20 mx-auto mb-5' />
        <h2 className='text-center text-2xl font-semibold text-gray-600'>Signup</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="relative">
            <input type="text" className='w-full p-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500' 
              id="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className='absolute left-0 -top-3.5 text-sm'>Email</label>
          </div>
          <div className="relative">
            <input type="text" className='w-full p-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500' 
              id="phonenumber" 
              required 
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label htmlFor="phonenumber" className='absolute left-0 -top-3.5 text-sm'>Phone Number</label>
          </div>
          <div className="relative">
            <input type="text" className='w-full p-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500' 
              id="address" 
              required 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address" className='absolute left-0 -top-3.5 text-sm'>Address</label>
          </div>
          <div className="relative">
            <input type="password" className='w-full p-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500' 
              id="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className='absolute left-0 -top-3.5 text-sm'>Password</label>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
            Signup
          </button>
        </form>
      </div>
    </div>
 );
};