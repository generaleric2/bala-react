import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Signup=()=> {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    acceptTerms: false
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validate required fields
    if (!username.trim()) newErrors.username = 'Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!phonenumber.trim()) newErrors.phonenumber = 'Phone number is required';
    
    // Email validation
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
  
    // Password validation
    if (!validatePassword(password)) {
      newErrors.password = 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character';
    }
  
    // Terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Privacy Policy';
    }
  
    // If there are errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://bala-canvas.onrender.com/customersignup', {
        username,
        address,
        phonenumber,
        email,
        password,
      });
  
      if (response.status === 200 || response.status === 201) {
        alert('Signup Successful', 'You can now login with your credentials.');
        navigate('/login');
      }
    } catch (error) {
      alert('Signup Failed', error.response?.data?.message || 'Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
      <img src="/signup.gif" alt="Signup GIF" className='w-20 mx-auto mb-5' />
        <h1 class="text-3xl font-bold text-black dark:text-black">Sign Up</h1>
        <p class="text-gray-500 dark:text-black">Create your account to get started.</p>
      </div>
      <form class="space-y-4" onSubmit={handleSubmit}>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
            for="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
            id="name"
            placeholder="John Doe"
            required=""
      value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      <div class="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
            for="phonenumber"
          >
            Phone Number
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
            id="phonenumber"
            placeholder="O712345678"
            required=""
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
            for="address"
          >
            Address
          </label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
            id="address"
            placeholder="Najjera"
            required=""
      value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="acceptTerms"
          id="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4"
        />
<label htmlFor="acceptTerms" className="text-sm text-gray-900 dark:text-gray-900">
  I accept the <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
</label>
      </div>
      {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
      <button
  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-black text-white"
  type="submit"
  disabled={loading}
>
  {loading ? 'Signing up...' : 'Sign Up'}
</button>
      </form>
    </div>
    </div>
 );
};