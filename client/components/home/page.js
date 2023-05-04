"use client";
import React from "react";
import styles from "../../styles/home/home.module.css";
import Header from "../header/page";
import HeroCard from "./heroCard/page";
import NewArrival from "./newArrival/page";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <HeroCard />
      <NewArrival />
    </div>
  );
};

export default Home;
