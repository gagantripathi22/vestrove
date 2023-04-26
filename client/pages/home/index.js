import React from "react";
import styles from "../../styles/home/home.module.css";
import Header from "../header/index";
import HeroCard from "./heroCard/index";
import NewArrival from "./newArrival/index";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <HeroCard />
      <NewArrival />
    </div>
  );
};

export default Home;
