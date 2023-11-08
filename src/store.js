import { configureStore } from "@reduxjs/toolkit";
import allUsersReducer from "./redux/user/allUsersReducer";
import deleteProductReducer from "./redux/product/deleteProductReducer";
import forgotPasswordReducer from "./redux/user/forgotPasswordReducer";
import newProductReducer from "./redux/product/newProductReducer";
import productDetailsReducer from "./redux/product/productDetailsReducer";
import productReducer from "./redux/product/productReducer";
import profileReducer from "./redux/user/profileReducer";
import userDetailsReducer from "./redux/user/userDetailsReducer";
import userReducer from "./redux/user/userReducer";
import cartReducer from "./redux/cart/cartReducer";
import favouriteReducer from "./redux/favourite/favouriteReducer";
import newOrderReducer from "./redux/order/newOrderReducer";
import myOrdersReducer from "./redux/order/myOrdersReducer";
import orderDetailsReducer from "./redux/order/orderDetailsReducer";
import newReviewReducer from "./redux/product/newReviewReducer";
import allOrdersReducer from "./redux/order/allOrdersReducer";
import orderReducer from "./redux/order/orderReducer";
import productReviewsReducer from "./redux/product/productReviewsReducer";
import deleteReviewReducer from "./redux/product/deleteReviewReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    order: newOrderReducer,
    myOrder: myOrdersReducer,
    myOrderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    createProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    AllOrders: allOrdersReducer,
    deleteOrder: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    deleteReview: deleteReviewReducer,
    productReviews: productReviewsReducer,
    forgotPassword: forgotPasswordReducer,
  },
});
