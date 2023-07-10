"use client";
import React, { useEffect, useLayoutEffect } from "react";
import styles from "../../styles/home/home.module.css";
import HeroCard from "./heroCard/page";
import NewArrival from "./newArrival/page";
import { useSelector } from "react-redux";
import InitializeData from "@/app/Redux/features/initialize/initialize";

const Home = ({ fetchNewArrivals }) => {
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  return (
    <>
      <InitializeData />
      <div className={styles.homeContainer}>
        {/* <button onClick={() => console.log(JSON.stringify(myData))}>
          test redux
        </button>
        <button
          onClick={() =>
            console.log(
              "Token in LocalStorage : ",
              localStorage.getItem("access-token")
            )
          }
        >
          Test Local Token
        </button> */}
        <HeroCard />
        <button onClick={() => console.log(scrollY)}></button>
        <NewArrival fetchNewArrivals={fetchNewArrivals} />
      </div>
    </>
  );
};

export default Home;
