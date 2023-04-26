import React from "react";
import styles from "../../../../styles/home/heroCard/herocard.module.css";

const BigCard = () => {
  return (
    <>
      <div className={styles.bigCardsContainer}>
        <div className={styles.bigCard}>
          <h1 className={styles.cardTitle}>women</h1>
        </div>
        <div style={{ width: 10 }}></div>
        <div className={styles.bigCard}>
          <h1 className={styles.cardTitle}>men</h1>
        </div>
      </div>
      <div style={{ height: 10 }}></div>
      <div className={styles.wideCard}>
        <h1 className={styles.cardTitle}>watches</h1>
      </div>
    </>
  );
};

export default BigCard;
