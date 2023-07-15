import { createSlice } from "@reduxjs/toolkit";

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    allOrdersRequested: (state) => {
      state.loading = true;
    },
    allOrdersSucceeded: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    allOrdersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllOrderErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allOrdersRequested,
  allOrdersSucceeded,
  allOrdersFailed,
  clearAllOrderErrors,
} = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
