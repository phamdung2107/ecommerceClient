import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  success: null,
};

const forgotPasswordReducer = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPasswordErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearPasswordErrors,
} = forgotPasswordReducer.actions;

export default forgotPasswordReducer.reducer;
