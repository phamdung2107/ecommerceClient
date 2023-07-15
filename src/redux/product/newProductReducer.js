import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  product: {},
  error: null,
};

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    newProductRequest: (state) => {
      state.loading = true;
    },
    newProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    newProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset: (state) => {
      state.success = false;
    },
    clearNewProductErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newProductRequest,
  newProductSuccess,
  newProductFail,
  newProductReset,
  clearNewProductErrors,
} = newProductSlice.actions;

export default newProductSlice.reducer;
