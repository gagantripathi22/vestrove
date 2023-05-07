"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: String;
  name: String;
  wishlist: any;
  cart: any;
  token: String;
}

const initialState: UserState = {
  email: "",
  name: "",
  wishlist: [],
  cart: [],
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addName: (state, action) => {
      state.name = action.payload;
    },
    addToWishlist: (state, action) => {
      const itemExists = state.wishlist.some((item) => item === action.payload);
      if (itemExists) return state;
      else state.wishlist.push(action.payload);
    },
    addToList: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    addToCart: (state, action) => {
      const itemExists = state.cart.some((item) => item === action.payload);
      if (itemExists) return state;
      else state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    resetStore: (state, action) => {
      return initialState;
    },
  },
});

export const {
  addToWishlist,
  addToList,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addEmail,
  addName,
  resetStore,
  addToken,
} = userSlice.actions;
export default userSlice.reducer;
