import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], favItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    addToFavorites: (state, action) => {
      const item = action.payload;

      const existItem = state.favItems.find((x) => x._id === item._id);

      if (existItem) {
        state.favItems = state.favItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.favItems = [...state.favItems, item];
      }

      return state;
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
    
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state)
    }
  },
});

export const { addToCart, addToFavorites, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;
