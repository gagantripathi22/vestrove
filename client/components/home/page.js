"use client";
import React, { useEffect } from "react";
import styles from "../../styles/home/home.module.css";
import Header from "../header/page";
import HeroCard from "./heroCard/page";
import NewArrival from "./newArrival/page";
import VerifyJwt from "@/services/verifyToken";

const Home = () => {
  const tokenVerification = async () => {
    const tokenDecoded = await VerifyJwt();
    if (!tokenDecoded) {
      localStorage.removeItem("access-token");
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);
  return (
    <div className={styles.homeContainer}>
      <HeroCard />
      <NewArrival />
    </div>
  );
};

export default Home;
