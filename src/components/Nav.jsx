import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ShoppingCart, User, MagnifyingGlass } from "phosphor-react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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
    setShowDropdown(false);
    navigate('/login');
  };

  const fetchProducts = async () => {
    try {
      const url =
        'https://bala-canvas.onrender.com/shop';
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
      product.productname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Store filtered results in localStorage
    localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
    
    // Navigate to search page with query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(''); // Clear search input
  };

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/balafinal.png" alt="shop logo" className="h-14 w-auto" />
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlass
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </form>
          
          <div className="flex items-center space-x-4">
            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center hover:text-gray-300"
              >
                <User size={24} />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
                  {isLoggedIn ? (
                    <>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Account Settings</Link>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="flex items-center">
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};