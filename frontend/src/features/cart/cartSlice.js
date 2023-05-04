import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    addToCart: (state, action) => {
      const { _id, name, price } = action.payload;
      const existingProduct = state.cartItems.find((product) => product._id === _id);
    
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ _id, name, price, quantity: 1 });
      }
    
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    increment: (state, action) => {
      const index = state.cartItems.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    decrement: (state, action) => {
      const index = state.cartItems.findIndex((product) => product._id === action.payload._id);
      if (index !== -1 && state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    updateCart: (state, action) => {
      const index = state.cartItems.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => product._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  showLoading,
  hideLoading,
  addToCart,
  increment,
  decrement,
  updateCart,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
