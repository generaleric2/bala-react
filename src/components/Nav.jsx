import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import {ShoppingCart} from "phosphor-react"
import {UserPlus} from "phosphor-react"
import {LockOpen, Lock} from "phosphor-react"
import '../components/navbar.css'
import { useSelector } from "react-redux"

export const Nav = ()=>{

  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div className="navbar">
      <div className="logo">
        <Link to="/"><img src="/logo.jpg" alt="shop logo"/></Link><span>BALA CANVAS</span>
      </div>
      <div className="links">
      <div class="dropdown">
        <button>
          <span>Categories</span>
        </button>
        <div class="dropdown-content">
          <a href="/men">Men</a>
          <a href="/women">Women</a>
          <a href="/children">Children</a>
          <a href="/">Sports</a>
        </div>
        </div>
        <div class="dropdown">
        <button>
            {isLoggedIn ? <UserPlus size={30} /> : <UserPlus size={32} />}
            <span>Account</span>
          </button>
          <div class="dropdown-content">
            {isLoggedIn ? (
              <button>
                <button className="login" onClick={handleLogout}>
                  <Lock size={30} /><a href='/login'><span>Logout</span></a>
                </button>
              </button>
            ) : (
              <button>
                <LockOpen size={30} /><a href="/login" className="login"><span>Login</span></a>
              </button>
            )}
          <hr></hr>
          <a href="/orders">Orders</a>
        </div>
        </div>
        </div>
        <button className="cart-btn">
        <Link to="/cart">
            <ShoppingCart size={32} />
            <span style={{marginLeft: '10px', marginTop: '25px'}}>Cart</span>
            {totalQuantity > 0 && (
              <span className="badge">{totalQuantity}</span>
            )}
        </Link>
        </button>
    </div>
  );
}