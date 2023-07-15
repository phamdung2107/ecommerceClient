import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    shippingInfo: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },
    savedShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});

export const { addToCart, removeCartItem, savedShippingInfo } =
  cartSlice.actions;

export default cartSlice.reducer;
