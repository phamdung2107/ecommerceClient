import { createSlice } from "@reduxjs/toolkit";

const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    deleteReviewRequested: (state) => {
      state.loading = true;
    },
    deleteReviewSucceeded: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteReviewFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },
    clearDeleteReviewErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  deleteReviewRequested,
  deleteReviewSucceeded,
  deleteReviewFailed,
  deleteReviewReset,
  clearDeleteReviewErrors,
} = deleteReviewSlice.actions;

export default deleteReviewSlice.reducer;
