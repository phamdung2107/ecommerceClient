import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearUserErrors,
} = userSlice.actions;

export default userSlice.reducer;
