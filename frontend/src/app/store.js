import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';
import adminReducer from '../features/admins/adminSlice'
import { api } from "state/api";
import globalReducer from "state";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    product: productReducer,
    cart: cartReducer,
    global: globalReducer,
    [api.reducerPath]: api.reducer,





  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});



