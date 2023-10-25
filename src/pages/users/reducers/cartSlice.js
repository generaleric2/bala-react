import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Rename 'products' to 'items' for clarity
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total += action.payload.price * action.payload.quantity;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);

      if (item) {
        state.total -= item.price * item.quantity;
        item.quantity = quantity;
        state.total += item.price * item.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.productId === productId);

      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter(item => item.productId !== productId);
      }
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;