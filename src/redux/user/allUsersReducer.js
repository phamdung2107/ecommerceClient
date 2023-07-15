import { createSlice } from "@reduxjs/toolkit";

const usersInitialState = {
  users: [],
  loading: false,
  error: null,
};

export const allUsersReducer = createSlice({
  name: "allUsers",
  initialState: usersInitialState,
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllUsersErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  clearAllUsersErrors,
} = allUsersReducer.actions;

export default allUsersReducer.reducer;
