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
    <div className="App">
      <div className="login-container">
        <img src="/hwe.gif" alt="Login GIF" style={{ width: '200px' }} className='w-20 mx-auto mb-5' />
        <h2 className='text-center text-2xl font-semibold text-gray-600'>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
              type="text"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className='block mb-2 text-indigo-500'>Email</label>
          </div>
          <div className="input-group">
            <input className='w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className='block mb-2 text-indigo-500'>Password</label>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};
