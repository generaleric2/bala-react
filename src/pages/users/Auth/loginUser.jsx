import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bala-canvas.onrender.com/customerlogin', {
        email,
        password,
      });

      const { idToken, uid } = response.data;
      console.log('Login successful! ID Token:', idToken, 'UID:', uid);
      navigate('/')
      setIsLoggedIn(true);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('uid', uid);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Please check your credentials.');
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#fff' }}>
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <img src="/hwe.gif" alt="Login GIF" className='w-20 mx-auto mb-5' />
      <h2 className='text-center text-2xl font-semibold text-gray-600'>Login</h2>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="relative">
          <input className='w-full p-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500'
            type="text"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label htmlFor="email" className='absolute left-0 -top-3.5 text-sm'>Email</label>
        </div>
        <div className="relative">
          <input className='w-full p-2 border-b-2 border-gray-300 outline-none focus:border-indigo-500'
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label htmlFor="password" className='absolute left-0 -top-3.5 text-sm'>Password</label>
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </form>
      <p className="text-center mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
      </p>
    </div>
  </div>
);
};
