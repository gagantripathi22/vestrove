import React, { useState } from "react";
import styles from "../../../styles/home/newArrival/newarrival.module.css";

const NewArrivals = () => {
  const [newArrivalData, setNewArrivalData] = useState([{}, {}, {}, {}, {}]);
  return (
    <div className={styles.newArrivalContainer}>
      <div className={styles.newArrivalSpacing}>
        <div className={styles.sectionTitle}>New Arrivals</div>
        <div className={styles.newArrivalList}>
          {newArrivalData.map((item) => {
            return (
              <div className={styles.newArrivalItem}>
                <div className={styles.newArrivalItemImage}></div>
                <div className={styles.newArrivalItemDetail}>
                  <div className={styles.newArrivalItemTitle}>Men Short</div>
                  <div className={styles.newArrivalItemPrice}>Rs. 1299</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
