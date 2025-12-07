import { AxiosInstance } from "@/lib/AxiosInstance";
import { createSlice } from "@reduxjs/toolkit";

export const WishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishList: (state, action) => {
      state.wishlist = action.payload;
    },
    resetWishList: (state, action) => {
      state.wishlist = [];
    },
  },
});

export const { resetWishList, setWishList } = WishListSlice.actions;

export default WishListSlice.reducer;
