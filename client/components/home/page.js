"use client";
import React, { useEffect, useLayoutEffect } from "react";
import styles from "../../styles/home/home.module.css";
import HeroCard from "./heroCard/page";
import NewArrival from "./newArrival/page";
import NewArrivalSlider from "./newArrivalSlider/page";
import { useSelector } from "react-redux";
import InitializeData from "@/app/Redux/features/initialize/initialize";

const Home = ({ fetchNewArrivals }) => {
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  return (
    <>
      <InitializeData />
      <div className={styles.homeContainer}>
        <HeroCard />
        <NewArrivalSlider />
        <NewArrival fetchNewArrivals={fetchNewArrivals} />
      </div>
    </>
  );
};

export default Home;
