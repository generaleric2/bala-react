import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartSlice';
import authReducer from '../reducers/userslice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});