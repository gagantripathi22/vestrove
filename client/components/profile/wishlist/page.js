import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/profile/profile.module.scss";
import jwt_decode from "jwt-decode";

const Wishlist = () => {
  const [item, setItems] = useState([]);

  const getWishlist = async () => {
    const getToken = localStorage.getItem("access-token");
    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUser[0]._id;
    const getWishlistUserData = await fetch(
      `http://localhost:8080/api/user/getWishlist`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          userId: getTokenUserId,
        }),
      }
    );
    if (getWishlistUserData.status == 200) {
      const res = await getWishlistUserData.json();
      console.log(res.wishlist);
      return res.wishlist;
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };
  const updateWishlistState = async () => {
    setItems(await getWishlist());
  };
  useEffect(() => {
    console.log("state : ", item);
  }, [item]);
  useEffect(() => {
    updateWishlistState();
  }, []);
  return (
    <div className={styles.basicDetailSection}>
      <h3 className={styles.sectionTitle}>Wishlist</h3>
      <div className={styles.sectionItemsGrid}>
        {item.map((data) => {
          return (
            <div className={styles.sectionGridItem}>
              <Image
                className={styles.sectionGridItemImage}
                src={data.image}
                height={180}
                width={180}
              ></Image>
              <div className={styles.sectoinGridItemDetail}>
                <div className={styles.sectionGridItemName}>{data.name}</div>
                <div className={styles.sectionGridItemPrice}>{data.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
