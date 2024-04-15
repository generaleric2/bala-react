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
<nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 flex flex-col justify-between">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-20">
              <Link to="/">
                <img src="/logo.jpg" alt="shop logo" />
              </Link>
            </div>
            <button
  onClick={toggleMenu}
  className="md:hidden ml-auto block text-white text-xl focus:outline-none"
>
  {isOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      viewBox="0 0 20 20"
      fill="currentColor"
      shape-rendering="auto"
    >
      <path
        fillRule="nonzero"
        d="M12.293 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L9.586 11H4a1 1 0 110-2h5.586l-2.293-2.293a1 1 0 111.414-1.414l4 4z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="nonzero" 
        d="M4 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1zm14-3a1 1 0 00-1-1H6a1 1 0 100 2h10a1 1 0 001-1zm-1 6a1 1 0 100-2H6a1 1 0 100 2h10z"
      />
    </svg>
  )}
</button>
          </div>
          <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="md:flex md:space-x-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  to="/men"
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/children"
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Children
                </Link>
              </li>
              <li>
              </li>
            </ul>
            {/* Login/Logout Button Inside the Toggle Menu */}
            <div className="md:ml-40">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-700 focus:outline-none"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-700 focus:outline-none"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="md:ml-auto">
              <Link to="/cart" className="flex items-center">
                <ShoppingCart size={32} />
                {totalQuantity > 0 && <span className="ml-2">{totalQuantity}</span>}
              </Link>
            </div>
        </div>
      </nav>
    );
  };
