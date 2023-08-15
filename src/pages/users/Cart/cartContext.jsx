import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      };

    case 'ADD_TO_CART':
      const updatedCart = [...state.cart];
      const existingItemIndex = updatedCart.findIndex(item => item.productId === action.payload.productId);

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...action.payload, quantity: 1 });
      }

      return {
        ...state,
        cart: updatedCart,
      };

    case 'UPDATE_QUANTITY':
      const updatedCartQuantity = state.cart.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        cart: updatedCartQuantity,
      };

    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.productId !== action.payload);

      return {
        ...state,
        cart: filteredCart,
      };

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3007/get-cart');
        dispatch({ type: 'SET_CART', payload: response.data });
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
