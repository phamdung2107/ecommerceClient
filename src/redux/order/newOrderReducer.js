import { createSlice } from "@reduxjs/toolkit";

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  reducers: {
    createOrderRequested: (state) => {
      state.loading = true;
    },
    createOrderSucceeded: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNewOrderErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  createOrderRequested,
  createOrderSucceeded,
  createOrderFailed,
  clearNewOrderErrors,
} = newOrderSlice.actions;

export default newOrderSlice.reducer;
