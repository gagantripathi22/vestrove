"use client";
import React from "react";
import styles from "../../../styles/home/newArrivalSlider/newarrivalslider.module.css";
import Slider from "./slider/page";

const NewArrivalSlider = () => {
  return (
    <div className={styles.newArrivalSliderContainer}>
      <h2 className={styles.newArrivalSliderHeading}>New Arrivals</h2>
      <div className={styles.newArrivalSliderSpacing}>
        <Slider />
      </div>
    </div>
  );
};

export default NewArrivalSlider;
