import React, { useEffect, useState } from "react";
import styles from "../../../styles/home/newArrival/newarrival.module.css";
import ItemList from "../../items/listItem/page";
import ListItem from "../../items/listItem/page";

const NewArrivals = () => {
  const getLastRecentAddedItems = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/recentSix`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`
          ),
      },
    }).then(async (res) => {
      setNewArrivalData(await res.json());
    });
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
