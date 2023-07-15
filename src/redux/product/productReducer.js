import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsCount: null,
    resultPerPage: null,
    filteredProductsCount: null,
    loading: false,
    error: null,
  },
  reducers: {
    getAllProductsRequest: (state) => {
      state.loading = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    getAllProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAdminProductRequest: (state) => {
      state.loading = true;
    },
    getAdminProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getAdminProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearProductErrors: (state) => {
      state.error = null;
    },
  },
});
export const {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail,
  getAdminProductRequest,
  getAdminProductSuccess,
  getAdminProductFail,
  clearProductErrors,
} = productSlice.actions;

export default productSlice.reducer;
