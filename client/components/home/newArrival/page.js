import React, { useState } from "react";
import styles from "../../../styles/home/newArrival/newarrival.module.css";
import ItemList from "../../items/listItem/page";
import ListItem from "../../items/listItem/page";

const NewArrivals = () => {
  const [newArrivalData, setNewArrivalData] = useState([{}, {}, {}, {}, {}]);
  return (
    <div className={styles.newArrivalContainer}>
      <div className={styles.newArrivalSpacing}>
        <div className={styles.sectionTitle}>New Arrivals</div>
        <div className={styles.newArrivalList}>
          {newArrivalData.map((item) => {
            return <ListItem />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
