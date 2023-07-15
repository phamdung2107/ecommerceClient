import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteItems: [],
  },
  reducers: {
    addToFavourite: (state, action) => {
      const item = action.payload;
      const isItemExist = state.favouriteItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.favouriteItems = state.favouriteItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.favouriteItems.push(item);
      }
    },
    removeFromFavourite: (state, action) => {
      state.favouriteItems = state.favouriteItems.filter(
        (i) => i.product !== action.payload
      );
    },
  },
});

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
