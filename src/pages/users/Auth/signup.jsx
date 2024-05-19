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
      console.log(response);
    } catch (error) {
      alert('Signup Failed', 'Please check your details and try again.');
      navigate('/signup');
      console.error('Signup failed:', error.message);
    }

  };


    return (
      <div class="mx-auto max-w-md space-y-6 py-12 ml-10">
      <div class="space-y-2 text-center">
      <img src="/signup.gif" alt="Signup GIF" className='w-20 mx-auto mb-5' />
        <h1 class="text-3xl font-bold dark:text-black">Sign Up</h1>
        <p class="text-gray-500 dark:text-gray-400">Create your account to get started.</p>
      </div>
      <form class="space-y-4" onSubmit={handleSignup}>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
            for="name"
          >
            Name
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
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
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
            type="email"
            id="email"
            placeholder="m@example.com"
            required=""
      value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
            for="phonenumber"
          >
            Phone Number
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
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
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
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
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
            type="password"
            id="password"
            required=""
      value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-black text-white"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
 );
};