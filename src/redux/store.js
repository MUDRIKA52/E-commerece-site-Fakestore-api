import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";  // Ensure this file exists
import productReducer from "./productSlice";  // Ensure this file exists

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export default store; // ✅ Ensure store is exported correctly



