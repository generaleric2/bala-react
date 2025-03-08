import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './login.css';
import AuthContext from './authSlice';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bala-canvas.onrender.com/customerlogin', {
        email,
        password,
      });

      const { idToken, uid } = response.data;
      navigate('/')
      setIsLoggedIn(true);
      setAuth(idToken, uid);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('uid', uid);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Please check your credentials.');
      navigate('/login');
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: '16px',
      boxSizing: 'border-box',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '400px',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        margin: '0 auto'
      }}>
    <div class="space-y-2 text-center">
      <img src="/hwe.gif" alt="Login GIF" className='w-20 mx-auto mb-5' />
      <h1 class="text-3xl font-bold text-black dark:text-black">Welcome Back</h1>
      <p class="text-black dark:text-black">Enter your email and password to sign in.</p>
    </div>
    <form class="space-y-4"  onSubmit={handleLogin}>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
          for="email"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
          type="email"
          id="email"
          placeholder="m@example.com"
          required=""
	  onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
          for="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
          type="password"
          id="password"
          required=""
	  onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-black text-white">
        Sign in
      </button>
      <p className="text-center mt-4 text-blue-500">
        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
      </p>
    </form>
  </div>
</div>
);
};
