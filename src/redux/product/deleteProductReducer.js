import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isDeleted: false,
  isUpdated: false,
  error: null,
};

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductReset: (state) => {
      state.isDeleted = false;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
    },
    clearDeleteProductErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  deleteProductRequest,
  deleteProductSuccess,
  updateProductRequest,
  updateProductSuccess,
  deleteProductFail,
  updateProductFail,
  deleteProductReset,
  updateProductReset,
  clearDeleteProductErrors,
} = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
