"use client";
import { useEffect } from "react";
import VerifyJwt from "@/services/verifyToken";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  addToCart,
  addEmail,
  addToken,
  addFirstname,
  addLastname,
  addId,
} from "@/app/Redux/features/user/userSlice";

const InitializeData = () => {
  const dispatch = useDispatch();
  const tokenVerification = async () => {
    const tokenDecoded = await VerifyJwt();
    if (tokenDecoded === false) {
      localStorage.removeItem("access-token");
    } else {
      await addDataToRedux();
    }
  };
  const addDataToRedux = async () => {
    const getToken = localStorage.getItem("access-token");
    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getLoginUserData = await fetch(
      `http://localhost:8080/api/user/getUserData`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          userId: getTokenUserId,
        }),
      }
    );
    if (getLoginUserData.status == 200) {
      const res = await getLoginUserData.json();
      const email = res.email;
      const firstname = res.firstname;
      const lastname = res.lastname;
      const wishlist = await Object.values(res.wishlist);
      const cart = await Object.values(res.cart);
      console.log("success");
      cart.map((item) => {
        dispatch(addToCart(item));
      });
      wishlist.map((item) => {
        dispatch(addToWishlist(item));
      });
      dispatch(addEmail(email));
      dispatch(addFirstname(firstname));
      dispatch(addLastname(lastname));
      dispatch(addToken(getToken));
      dispatch(addId(getTokenUserId));
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);
};

export default InitializeData;
