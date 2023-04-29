import React, { useState } from "react";
import styles from "../../../styles/profile/profile.module.scss";

const Wishlist = () => {
  const [item, setItems] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  return (
    <div className={styles.basicDetailSection}>
      <h3 className={styles.sectionTitle}>Wishlist</h3>
      <div className={styles.sectionItemsGrid}>
        {item.map((data) => {
          return (
            <div className={styles.sectionGridItem}>
              <div className={styles.sectionGridItemImage}></div>
              <div className={styles.sectoinGridItemDetail}>
                <div className={styles.sectionGridItemName}>Mens Short</div>
                <div className={styles.sectionGridItemPrice}>Rs. 699</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
