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
      alert('Login successful!');
      setIsLoggedIn(true);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('uid', uid);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Please check your credentials.');
    }

    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <img src="/hwe.gif" alt="Login GIF" style={{ width: '200px' }} />
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
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
