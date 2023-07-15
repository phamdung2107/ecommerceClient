import axios from "../axios";
import {
  addToFavourite,
  removeFromFavourite,
} from "../redux/favourite/favouriteReducer";

// Add to favourites
export const addFavouriteItemsToCart =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v2/product/${id}`);

    dispatch(
      addToFavourite({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      })
    );

    localStorage.setItem("favouriteItems", getState().favourite.favouriteItems);
  };

// Delete from favourites
export const deleteFavouriteItemsToCart =
  (id) => async (dispatch, getState) => {
    dispatch(removeFromFavourite(id));

    localStorage.setItem("favouriteItems", getState().favourite.favouriteItems);
  };
