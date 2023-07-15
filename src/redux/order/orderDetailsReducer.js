import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: false,
    order: {},
    error: null,
  },
  reducers: {
    orderDetailsRequested: (state) => {
      state.loading = true;
    },
    orderDetailsSucceeded: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrderDetailsErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  orderDetailsRequested,
  orderDetailsSucceeded,
  orderDetailsFailed,
  clearOrderDetailsErrors,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
