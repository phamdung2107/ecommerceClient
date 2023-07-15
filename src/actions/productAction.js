import axios from "../axios";
import {
  deleteProductRequest,
  deleteProductSuccess,
  updateProductRequest,
  updateProductSuccess,
  deleteProductFail,
  updateProductFail,
} from "../redux/product/deleteProductReducer";
import {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail,
  getAdminProductRequest,
  getAdminProductSuccess,
  getAdminProductFail,
} from "../redux/product/productReducer";
import {
  newProductRequest,
  newProductSuccess,
  newProductFail,
} from "../redux/product/newProductReducer";
import {
  getProductDetailsRequest,
  getProductDetailsSuccess,
  getProductDetailsFail,
} from "../redux/product/productDetailsReducer";
import {
  newReviewFailed,
  newReviewRequested,
  newReviewSucceeded,
} from "../redux/product/newReviewReducer";
import {
  allReviewsFailed,
  allReviewsRequested,
  allReviewsSucceeded,
} from "../redux/product/productReviewsReducer";
import {
  deleteReviewFailed,
  deleteReviewRequested,
  deleteReviewSucceeded,
} from "../redux/product/deleteReviewReducer";
import Cookies from "js-cookie";

export const getProduct =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch(getAllProductsRequest());

      let link = `/api/v2/products?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v2/products?category=${category}&keyword=${keyword}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch(getAllProductsSuccess(data));
    } catch (error) {
      dispatch(getAllProductsFail(error.response.data.message));
    }
  };

// Get All Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(getProductDetailsRequest());

    const { data } = await axios.get(`/api/v2/product/${id}`);

    dispatch(getProductDetailsSuccess(data.product));
  } catch (error) {
    dispatch(getProductDetailsFail(error.response.data.message));
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(newReviewRequested());

    const config = { headers: { "Content-Type": "application/json" } };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.post(
      `/api/v2/product/review`,
      reviewData,
      config
    );

    dispatch(newReviewSucceeded(data.success));
  } catch (error) {
    dispatch(newReviewFailed(error.response.data.message));
  }
};

// Create Product --------Admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.post(
      "/api/v2/product/new",
      productData,
      config
    );

    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(newProductFail(error.response.data.message));
  }
};

// Get Admin Products -----Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch(getAdminProductRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get(`/api/v2/admin/products`, config);

    dispatch(getAdminProductSuccess(data.products));
  } catch (error) {
    dispatch(getAdminProductFail(error.response.data.message));
  }
};

// Delete Product ------Admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.delete(`/api/v2/product/${id}`, config);

    dispatch(deleteProductSuccess(data.success));
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.put(
      `/api/v2/product/${id}`,
      productData,
      config
    );

    dispatch(updateProductSuccess(data.success));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch(allReviewsRequested());
    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.get(`/api/v2/reviews?id=${id}`, config);

    dispatch(allReviewsSucceeded(data.reviews));
  } catch (error) {
    dispatch(allReviewsFailed(error.response.data.message));
  }
};

// Delete Review of a Product ------ Admin
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequested());
    const config = { headers: { "Content-Type": "application/json" } };

    const csrfToken = Cookies.get("csrfToken");

    if (csrfToken) {
      config.headers["token"] = csrfToken;
    }

    const { data } = await axios.delete(
      `/api/v2/reviews?id=${reviewId}&productId=${productId}`,
      config
    );

    dispatch(deleteReviewSucceeded(data.success));
  } catch (error) {
    dispatch(deleteReviewFailed(error.response.data.message));
  }
};
