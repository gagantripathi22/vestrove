import React from "react";
import styles from "../../../styles/home/heroCard/herocard.module.css";
import BigCard from "./bigCard/index";

const HeroCard = () => {
  return (
    <div className={styles.heroCardContainer}>
      <div className={styles.heroCardSpacing}>
        <BigCard />
      </div>
    </div>
  );
};

export default HeroCard;
