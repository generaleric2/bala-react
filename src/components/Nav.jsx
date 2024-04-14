import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import {ShoppingCart} from "phosphor-react"
import {UserPlus} from "phosphor-react"
import {LockOpen, Lock} from "phosphor-react"
import '../components/navbar.css'
import { useSelector } from "react-redux"

export const Nav = ()=>{
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
    setItem({ uid: '', idToken: '' });
    localStorage.removeItem('uid');
  };

  
  return(
    <div className="flex flex-wrap items-center justify-between p-3">
      <div className="h-10 w-20">
        <Link to="/"><img src="/logo.jpg" alt="shop logo"/></Link>
      </div>
      <div class="flex md:hidden">
        <button id="hamburger" onClick={toggleMenu}>
        <img className={`toggle ${isOpen ? 'hidden' : 'block'}`} src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" alt="Open Menu" />
        <img className={`toggle ${isOpen ? 'block' : 'hidden'}`} src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" alt="Close Menu" />
        </button>
    </div>
    <div className={`toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none ${isOpen ? 'block' : 'hidden'}`}>
        <a href="/"
            class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Sports
        </a>
        <a href="/men"
            class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Men
        </a>
        <a href="/women"
            class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Women
        </a>
        <a href="/children"
            class="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Children
        </a>
    </div>
    {isLoggedIn ? (
            <a href="/login" onClick={handleLogout}
            class="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-100 text-white md:rounded">LOGOUT
    
        </a>
    ) : (
    <a href="/login"
        class="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-500 text-white md:rounded">LOGIN

    </a>
    )}
        <button className="cart-btn">
        <Link to="/cart">
            <ShoppingCart size={32} />
            {totalQuantity > 0 && (
              <span className="badge">{totalQuantity}</span>
            )}
        </Link>
        </button>
    </div>
  );
}