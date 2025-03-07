import React, { useState, useEffect, useContext } from 'react';
import { Nav } from '../../../components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash } from "phosphor-react";
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../reducers/cartSlice';
import axios from 'axios';
import emailjs from "@emailjs/browser";
import AuthContext from '../Auth/authSlice';

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const { authState } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (authState.uid) {
      axios.get(`http://localhost:3007/customers/${authState.uid}`)
        .then(response => setCustomerDetails(response.data))
        .catch(error => console.error('Failed to fetch customer:', error));
    }
 }, [authState.uid]);

 useEffect(() => {
  setIsLoggedIn(!!authState.uid);
  setUserId(authState.uid);
}, [authState.uid]);

  const SHIPPING_FEE = 10000;

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    const storedIdToken = localStorage.getItem('idToken');
    const storedUid = localStorage.getItem('uid');
    if (storedIdToken && storedUid) {
      setIsLoggedIn(true);

      const customerInfo = JSON.parse(localStorage.getItem(storedUid)) || {};
      setCustomerDetails(customerInfo);
    }
 }, []);

// Update useEffect for customer info
useEffect(() => {
  const fetchCustomerInfo = async () => {
    const uid = authState.uid || localStorage.getItem('uid');
    const token = localStorage.getItem('idToken');

    if (!uid || !token) {
      console.error('Missing authentication:', { uid, token });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3007/customer/${uid}`, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });
      setCustomerDetails(response.data);
      
    } catch (error) {
      console.error('Customer fetch error:', {
        error: error.message,
        uid,
        response: error.response?.data
      });
    }
  };

  fetchCustomerInfo();
}, [authState.uid]);


const handleCheckout = async () => {
  setIsLoading(true);
  setError(null);

  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('idToken');

  if (!uid || !token) {
    console.error('Checkout authentication error:', { uid, token });
    setError('Please login to checkout');
    setIsLoading(false);
    return;
  }

  const products = cart.items.map(item => ({
    productName: item.productname,
    size: item.size,
    quantity: item.quantity
 }));


  if (!customerDetails || !customerDetails.email) {
    console.error('Missing customer details:');
    setError('Customer information not found');
    setIsLoading(false);
    return;
  }

  const checkoutPayload = {
    products: cart.items.map(item => ({
      size: item.size,
      quantity: item.quantity,
      productName: item.productname
    })),
    totalPrice: calculateTotal() + SHIPPING_FEE,
    uid,
    customerEmail: customerDetails.email
  };

  try {
    const checkoutResponse = await axios.post(
      'http://localhost:3007/checkout', 
      checkoutPayload,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Checkout response:', {
      status: checkoutResponse.status,
      data: checkoutResponse.data
    });

    if (checkoutResponse.status === 200) {
      const productImageUrls = cart.items.map(item => item.productImage).join(', ');
      const templateParams = {
          productName: products.map(product => product.productName).join(', '),
          totalPrice: calculateTotal(),
          quantity: cart.items.reduce((acc, item) => acc + item.quantity, 0),
          size: cart.items.map(item => item.size).join(', '),
          userEmail: customerDetails.email,
          customerName: customerDetails.username,
          productImageUrls,
      };

      try {
        const emailResponse = await emailjs.send(
          'service_cn2iji3',
          'template_6sxi4jr',
          templateParams,
          'LPfIrBdBcOXiGfeHh'
        );
        console.log('Email sent successfully:', emailResponse);
      } catch (emailError) {
        console.error('Email sending failed:', {
          error: emailError,
          params: templateParams
        });
      }

      dispatch(clearCart());
      alert('Order placed successfully!');
    }
  } catch (error) {
    console.error('Checkout error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      requestPayload: checkoutPayload,
      endpoint: 'http://localhost:3007/checkout'
    });
    
    setError(
      error.response?.data?.message || 
      error.response?.statusText || 
      'Checkout failed. Please try again.'
    );
  } finally {
    setIsLoading(false);
  }
};

  if (cart.items.length === 0) {
    return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center"> {/* Changed this line */}
  <Nav />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  {/* Removed pt-24 */}
    <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" weight="thin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" p-40 min-h-screen bg-gray-50 flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 lg:py-10 overflow-x-hidden w-full">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-600 hover:text-red-800 flex items-center"
          >
            <Trash size={20} className="mr-2" />
            Clear Cart
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex flex-col sm:flex-row items-center">
                  <img
                    src={`http://localhost:3007/${item.productimage[0]}`}
                    alt={item.productname}
                    className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0"
                  />
                  <div className="flex-1 sm:ml-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.productname}</h3>
                        <p className="text-gray-600 mt-1">UGX {item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                    <div className="flex items-center mt-4">
                      <button
                         onClick={() => handleQuantity(item.productId, item.quantity - 1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-4 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                         onClick={() => handleQuantity(item.productId, item.quantity + 1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>UGX {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>UGX {SHIPPING_FEE.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>UGX {cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0) + 10000}</span>
                    </div>
                  </div>
                  <div className="pt-6">
                  <button
                  onClick={handleCheckout} // Remove cart argument
                  disabled={isLoading || cart.items.length === 0}
                  className={`w-full py-3 px-4 text-white rounded-lg ${
                    isLoading || cart.items.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Order'}
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};