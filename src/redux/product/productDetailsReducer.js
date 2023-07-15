import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { product: {}, loading: false, error: null },
  reducers: {
    getProductDetailsRequest: (state) => {
      state.loading = true;
    },
    getProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductDetailsErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getProductDetailsRequest,
  getProductDetailsSuccess,
  getProductDetailsFail,
  clearProductDetailsErrors,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
