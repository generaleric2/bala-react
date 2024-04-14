import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import '../components/navbar.css';
import { useSelector } from "react-redux";

export const Nav = () => {
 const [isOpen, setIsOpen] = useState(false);
 const cart = useSelector((state) => state.cart);
 const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const toggleMenu = () => {
    setIsOpen(!isOpen);
 };

 useEffect(() => {
    const storedIdToken = localStorage.getItem('idToken');
    const storedUid = localStorage.getItem('uid');
    if (storedIdToken && storedUid) {
      setIsLoggedIn(true);
    }
 }, []);

 const handleLogout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('idToken');
    setIsLoggedIn(false);
 };

 return (
  <nav className="flex flex-col md:flex-row items-center justify-between p-3 w-full">
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center">
      <div className="h-10 w-20">
        <Link to="/"><img src="/logo.jpg" alt="shop logo" /></Link>
      </div>
      <div className="flex md:hidden">
        <button id="hamburger" onClick={toggleMenu} className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon */}
          <svg className={`${isOpen ? 'hidden' : 'block'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
          {/* Close icon */}
          <svg className={`${isOpen ? 'block' : 'hidden'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
    <Link to="/cart" className="flex items-center ml-auto md:ml-0">
      <ShoppingCart size={32} />
      {totalQuantity > 0 && (
        <span className="ml-2">{totalQuantity}</span>
      )}
    </Link>
  </div>
  <div className={`${isOpen ? 'block' : 'hidden'} items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}>
    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
      <li>
        <Link to="/" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Sports</Link>
      </li>
      <li>
        <Link to="/men" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Men</Link>
      </li>
      <li>
        <Link to="/women" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Women</Link>
      </li>
      <li>
        <Link to="/children" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Children</Link>
      </li>
    </ul>
    {/* Login/Logout Button Inside the Toggle Menu */}
    <div className="mt-4">
      {isLoggedIn ? (
        <a href="/login" onClick={handleLogout} className="flex items-center justify-center block w-full px-4 py-2 text-center bg-blue-900 hover:bg-blue-100 text-white rounded">LOGOUT</a>
      ) : (
        <a href="/login" className="flex items-center justify-center block w-full px-4 py-2 text-center bg-blue-900 hover:bg-blue-500 text-white rounded">LOGIN</a>
      )}
    </div>
  </div>
</nav>
);
};
