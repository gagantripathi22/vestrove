import React, { useEffect, useState } from "react";
import styles from "../../../styles/home/newArrival/newarrival.module.css";
import ItemList from "../../items/listItem/page";
import ListItem from "../../items/listItem/page";

const NewArrivals = ({ fetchNewArrivals }) => {
  const getLastRecentAddedItems = async () => {
    const productData = await fetchNewArrivals();
    setNewArrivalData(productData);
  };
  const [newArrivalData, setNewArrivalData] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  useEffect(() => {
    getLastRecentAddedItems();
  }, []);
  return (
    <div className={styles.newArrivalContainer}>
      <div className={styles.newArrivalSpacing}>
        <div className={styles.sectionTitle}>New Arrivals</div>
        <div className={styles.newArrivalList}>
          {newArrivalData.map((item) => {
            return <ListItem item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
