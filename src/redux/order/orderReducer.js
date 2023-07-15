import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    isUpdated: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    updateOrderRequested: (state) => {
      state.loading = true;
    },
    updateOrderSucceeded: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteOrderRequested: (state) => {
      state.loading = true;
    },
    deleteOrderSucceeded: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    orderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderReset: (state) => {
      state.isUpdated = false;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },
    clearOrderErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateOrderRequested,
  updateOrderSucceeded,
  deleteOrderRequested,
  deleteOrderSucceeded,
  orderFailed,
  updateOrderReset,
  deleteOrderReset,
  clearOrderErrors,
} = orderSlice.actions;

export default orderSlice.reducer;
