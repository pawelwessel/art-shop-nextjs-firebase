import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: null,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    prepareCart: (state) => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.cart = JSON.parse(cart);
      } else {
        state.cart = [];
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.title === action.payload.title
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { setCart, removeFromCart, prepareCart } = shopSlice.actions;

export default shopSlice.reducer;
