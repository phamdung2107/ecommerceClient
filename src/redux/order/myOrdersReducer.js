import { createSlice } from "@reduxjs/toolkit";

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    myOrdersRequested: (state) => {
      state.loading = true;
    },
    myOrdersSucceeded: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrdersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMyOrderErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  myOrdersRequested,
  myOrdersSucceeded,
  myOrdersFailed,
  clearMyOrderErrors,
} = myOrdersSlice.actions;

export default myOrdersSlice.reducer;
