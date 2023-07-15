import axios from "../axios";
import {
  myOrdersFailed,
  myOrdersRequested,
  myOrdersSucceeded,
} from "../redux/order/myOrdersReducer";
import {
  createOrderFailed,
  createOrderRequested,
  createOrderSucceeded,
} from "../redux/order/newOrderReducer";
import {
  allOrdersRequested,
  allOrdersSucceeded,
  allOrdersFailed,
} from "../redux/order/allOrdersReducer";
import {
  orderDetailsRequested,
  orderDetailsSucceeded,
  orderDetailsFailed,
} from "../redux/order/orderDetailsReducer";
import {
  updateOrderRequested,
  updateOrderSucceeded,
  deleteOrderRequested,
  deleteOrderSucceeded,
  orderFailed,
} from "../redux/order/orderReducer";
import Cookies from "js-cookie";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequested());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }
    const { data } = await axios.post("/api/v2/order/new", order, config);

    dispatch(createOrderSucceeded(data));
  } catch (error) {
    dispatch(createOrderFailed(error.response.data.message));
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequested());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get("/api/v2/orders/me", config);

    dispatch(myOrdersSucceeded(data.orders));
  } catch (error) {
    dispatch(myOrdersFailed(error.response.data.message));
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequested);

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get(`/api/v2/order/${id}`, config);

    dispatch(orderDetailsSucceeded(data.order));
  } catch (error) {
    dispatch(orderDetailsFailed(error.response.data.message));
  }
};

// All order  -----Admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(allOrdersRequested());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get("/api/v2/admin/orders", config);

    dispatch(allOrdersSucceeded(data.orders));
  } catch (error) {
    dispatch(allOrdersFailed(error.response.data.message));
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch(updateOrderRequested());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }
    const { data } = await axios.put(
      `/api/v2/admin/order/${id}`,
      order,
      config
    );

    dispatch(updateOrderSucceeded(data.success));
  } catch (error) {
    dispatch(orderFailed(error.response.data.message));
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequested());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.delete(`/api/v2/admin/order/${id}`, config);

    dispatch(deleteOrderSucceeded(data.success));
  } catch (error) {
    dispatch(orderFailed(error.response.data.message));
  }
};
