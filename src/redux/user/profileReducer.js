import { createSlice } from "@reduxjs/toolkit";
const profileInitialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  message: null,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    deleteAccountRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    deleteAccountSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    },
    updateProfileReset: (state) => {
      state.isUpdated = false;
    },
    updatePasswordReset: (state) => {
      state.isUpdated = false;
    },
    deleteAccountReset: (state) => {
      state.isDeleted = false;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAccountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserReset: (state) => {
      state.isUpdated = false;
    },
    clearProfileErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileReset,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updatePasswordReset,
  deleteAccountRequest,
  deleteAccountReset,
  deleteAccountSuccess,
  deleteAccountFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updateUserReset,
  clearProfileErrors,
} = profileSlice.actions;

export default profileSlice.reducer;
