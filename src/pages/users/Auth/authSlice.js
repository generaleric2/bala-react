import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  idToken: null,
  uid: null,
  isLoading: false,
  error: null,
  orders: [],
  isFetchingOrders: false,
  orderError: null,
};

export const login = createAsyncThunk(
   
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://bala-canvas.onrender.com/customerlogin', {
        email,
        password,
      });



      const { idToken, uid } = response.data;
      return { idToken, uid };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'auth/fetchOrders',
  async (_, { getState }) => {
    const uid = getState().auth.uid;
    const response = await axios.get(`https://bala-canvas.onrender.com/customers/${uid}/orders`);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.idToken = null;
      state.uid = null;
      localStorage.removeItem('uid'); // Clear UID on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.idToken = action.payload.idToken;
        state.uid = action.payload.uid;
        localStorage.setItem('uid', action.payload.uid); // Store UID in localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        localStorage.removeItem('uid'); // Clear UID on login error
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isFetchingOrders = true;
        state.orderError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isFetchingOrders = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isFetchingOrders = false;
        state.orderError = action.error.message;
        if (action.error.response && action.error.response.status === 401) {
          state.idToken = null;
          state.uid = null;
          localStorage.removeItem('uid'); // Clear UID on 401 error
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
