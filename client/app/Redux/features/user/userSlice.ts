"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: String;
  firstname: String;
  lastname: String;
  wishlist: any;
  cart: any;
  token: String;
}

const initialState: UserState = {
  email: "",
  firstname: "",
  lastname: "",
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
    addFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    addLastname: (state, action) => {
      state.lastname = action.payload;
    },
    addToWishlist: (state, action) => {
      const itemExists = state.wishlist.some((item) => item === action.payload);
      if (itemExists) return state;
      else state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item !== action.payload);
    },
    addToCart: (state, action) => {
      const itemExists = state.cart.some((item) => item === action.payload);
      if (itemExists) return state;
      else state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item !== action.payload);
    },
    resetStore: (state, action) => {
      return initialState;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addEmail,
  addFirstname,
  addLastname,
  resetStore,
  addToken,
} = userSlice.actions;
export default userSlice.reducer;
