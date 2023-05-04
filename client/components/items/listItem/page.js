import React from "react";
import styles from "../../../styles/listItem/listitem.module.scss";

const ListItem = ({ itemWidth }) => {
  return (
    <div className={styles.listItem} style={{ width: itemWidth }}>
      <div className={styles.listItemImage}></div>
      <div className={styles.listItemDetail}>
        <div className={styles.newArrivalItemTitle}>Men Short</div>
        <div className={styles.newArrivalItemPrice}>Rs. 1299</div>
      </div>
    </div>
  );
};

export default ListItem;
