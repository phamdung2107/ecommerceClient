import axios from "../axios";
import {
  addToCart,
  removeCartItem,
  savedShippingInfo,
} from "../redux/cart/cartReducer";

// Add to Cart ---Product
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v2/product/${id}`);

  dispatch(
    addToCart({
      productId: data.product._id,
      productName: data.product.name,
      productPrice: data.product.price,
      productImage: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    })
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART ---Product
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeCartItem(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch(savedShippingInfo(data));

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
