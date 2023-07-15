import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    getUserDetailsRequest: (state) => {
      state.loading = true;
    },
    getUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserDetailsErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getUserDetailsRequest,
  getUserDetailsSuccess,
  getUserDetailsFail,
  clearUserDetailsErrors,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
