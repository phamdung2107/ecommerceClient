import { createSlice } from "@reduxjs/toolkit";

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
  },
  reducers: {
    allReviewsRequested: (state) => {
      state.loading = true;
    },
    allReviewsSucceeded: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    allReviewsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductReviewErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allReviewsRequested,
  allReviewsSucceeded,
  allReviewsFailed,
  clearProductReviewErrors,
} = productReviewsSlice.actions;

export default productReviewsSlice.reducer;
