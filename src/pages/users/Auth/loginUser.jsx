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
    <div class="flex h-screen w-full items-center justify-center bg-white dark:bg-white">
  <div class="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-white">
    <div class="space-y-2 text-center">
      <img src="/hwe.gif" alt="Login GIF" className='w-20 mx-auto mb-5' />
      <h1 class="text-3xl font-bold">Welcome Back</h1>
      <p class="text-gray-500 dark:text-gray-400">Enter your email and password to sign in.</p>
    </div>
    <form class="space-y-4"  onSubmit={handleLogin}>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Email
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          id="email"
          placeholder="m@example.com"
          required=""
	  onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="password"
        >
          Password
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="password"
          id="password"
          required=""
	  onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-black text-white">
        Sign in
      </button>
      <p className="text-center mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up here</a>
      </p>
    </form>
  </div>
</div>
);
};
