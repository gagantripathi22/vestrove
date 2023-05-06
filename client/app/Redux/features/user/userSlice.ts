"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: String;
  name: String;
  wishlist: any;
  cart: any;
}

const initialState: UserState = {
  email: "",
  name: "",
  wishlist: [],
  cart: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addName: (state, action) => {
      state.name = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addEmail,
  addName,
} = userSlice.actions;
export default userSlice.reducer;
