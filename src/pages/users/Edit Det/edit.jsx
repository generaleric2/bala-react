import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth/login.css';

export const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(location.state?.customerDetails || {});
  const storedUid = localStorage.getItem('uid');

  useEffect(() => {
    if (location.state && location.state.customerDetails) {
      setCustomerDetails(location.state.customerDetails);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCustomerDetails({
     ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      if (!storedUid) {
        throw new Error('No UID found in AuthContext');
      }
  
      const response = await axios.put(
        'http://localhost:3007/updatecustomer',
        {
          ...customerDetails,
           uid: storedUid, 
         }
      );
  
      alert('Customer details updated successfully!');
      navigate('/cart');
    } catch (error) {
      console.error('Failed to update customer details:', error);
      alert('Failed to update customer details.');
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-white">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-white">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-black">Please Edit Info</h1>
          <p className="text-black dark:text-black">Enter New Credentials</p>
        </div>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black" htmlFor="email">
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
              type="email"
              id="email"
              name="email"
              placeholder="m@example.com"
              value={customerDetails.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black" htmlFor="phonenumber">
              Phone Number
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
              type="text"
              id="phonenumber"
              name="phonenumber"
              placeholder="Your phone number"
              value={customerDetails.phonenumber || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black" htmlFor="address">
              Address
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white"
              type="text"
              id="address"
              name="address"
              placeholder="Your address"
              value={customerDetails.address || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-black text-white">
            Update
          </button>
          <p className="text-center mt-4 dark:text-black">
            Having Issues with Update? <a href="mailto:orders@basis-ec.shop" className="text-blue-500 hover:underline">Contact Us</a>
          </p>
        </form>
      </div>
    </div>
  );
};
