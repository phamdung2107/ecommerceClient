import axios from "../axios";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerUserFail,
  registerUserRequest,
  registerUserSuccess,
} from "../redux/user/userReducer";
import {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
} from "../redux/user/allUsersReducer";
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "../redux/user/forgotPasswordReducer";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  deleteAccountRequest,
  deleteAccountSuccess,
  deleteAccountFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
} from "../redux/user/profileReducer";
import {
  getUserDetailsRequest,
  getUserDetailsSuccess,
  getUserDetailsFail,
} from "../redux/user/userDetailsReducer";
import Cookies from "js-cookie";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v2/login`,
      { email, password },
      config
    );

    // lưu token vào cookie
    Cookies.set("csrfToken", data.token);

    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v2/registration`, userData, config);

    // lưu token vào cookie
    Cookies.set("csrfToken", data.token);

    dispatch(registerUserSuccess(data.user));
  } catch (error) {
    dispatch(registerUserFail(error.response.data.message));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get(`/api/v2/me`, config);
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// Log out user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v2/logout`);

    dispatch(logoutSuccess());
    // lưu token vào cookie
    Cookies.set("token", null);
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.put(
      "/api/v2/me/update/info",
      userData,
      config
    );

    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

// Update Password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.put("/api/v2/me/update", password, config);

    dispatch(updatePasswordSuccess(data));
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get(`/api/v2/admin/users`, config);

    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v2/password/forgot",
      { email },
      config
    );

    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v2/password/reset/${token}`,
      passwords,
      config
    );

    dispatch(resetPasswordSuccess(data.success));
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

// Delete User ----- Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteAccountRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    await axios.delete(`/api/v2/admin/user/${id}`, config);

    dispatch(deleteAccountSuccess(true));
  } catch (error) {
    dispatch(deleteAccountFail(error.response.data.message));
  }
};

// get  User Details ----- Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(getUserDetailsRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get(`/api/v2/admin/user/${id}`, config);

    dispatch(getUserDetailsSuccess(data.user));
  } catch (error) {
    dispatch(getUserDetailsFail(error.response.data.message));
  }
};

// Update user ----- Admin
export function updateUser(id, userData) {
  return async (dispatch) => {
    try {
      dispatch(updateUserRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const csrfToken = Cookies.get("csrfToken");

      if (csrfToken) {
        config.headers["token"] = csrfToken;
      }
      const { data } = await axios.put(
        `/api/v2/admin/user/${id}`,
        userData,
        config
      );
      dispatch(updateUserSuccess(data.success));
    } catch (error) {
      dispatch(updateUserFail(error.response.data.message));
    }
  };
}
