"use client";
import React, { useEffect } from "react";
import styles from "../../styles/home/home.module.css";
import HeroCard from "./heroCard/page";
import NewArrival from "./newArrival/page";
import VerifyJwt from "@/services/verifyToken";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  addToCart,
  addName,
  addEmail,
  addToList,
  addToken,
} from "@/app/Redux/features/user/userSlice";

const Home = () => {
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  const dispatch = useDispatch();

  const tokenVerification = async () => {
    const tokenDecoded = await VerifyJwt();
    if (!tokenDecoded) {
      localStorage.removeItem("access-token");
    } else {
      await addDataToRedux();
    }
  };

  const addDataToRedux = async () => {
    const getToken = localStorage.getItem("access-token");
    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUser[0]._id;
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
      const name = res.name;
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
      dispatch(addName(name));
      dispatch(addToken(getToken));
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);
  return (
    <div className={styles.homeContainer}>
      <button onClick={() => console.log(JSON.stringify(myData))}>
        test redux
      </button>
      <button onClick={() => dispatch(addToList("Hola"))}>
        add wishlist test
      </button>
      <HeroCard />
      <NewArrival />
    </div>
  );
};

export default Home;
