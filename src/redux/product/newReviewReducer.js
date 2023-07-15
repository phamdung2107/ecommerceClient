import { createSlice } from "@reduxjs/toolkit";

const newReviewSlice = createSlice({
  name: "newReview",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    newReviewRequested: (state) => {
      state.loading = true;
    },
    newReviewSucceeded: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewReset: (state) => {
      state.success = false;
    },
    clearNewReviewErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newReviewRequested,
  newReviewSucceeded,
  newReviewFailed,
  newReviewReset,
  clearNewReviewErrors,
} = newReviewSlice.actions;

export default newReviewSlice.reducer;
