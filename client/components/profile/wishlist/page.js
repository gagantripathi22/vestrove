import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/profile/profile.module.scss";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import RemoveBtn from "../../items/removeBtn/page";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/app/Redux/features/user/userSlice";
import InitializeData from "../../../app/Redux/features/initialize/initialize";

const Wishlist = () => {
  const [item, setItems] = useState([]);
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  const dispatch = useDispatch();

  const getWishlist = async () => {
    const getToken = localStorage.getItem("access-token");
    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getWishlistUserData = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/getWishlist`,
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
  const handleRemoveFromWishlist = async (itemId, itemIndex) => {
    const userEmail = await myData.email;
    const userToken = await myData.token;
    console.log(userEmail, itemId, userToken);
    const tryLogin = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/removeFromWishlist`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          email: userEmail,
          itemId: itemId,
        }),
      }
    );
    if (tryLogin.status == 200) {
      console.log("success");
      dispatch(removeFromWishlist(itemId));
      const newItems = item.filter((item, i) => i !== itemIndex);
      setItems(newItems);
      return tryLogin.json();
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };
  useEffect(() => {
    console.log("state : ", item);
  }, [item]);
  useEffect(() => {
    updateWishlistState();
  }, []);
  return (
    <>
      <InitializeData />
      <div className={styles.basicDetailSection}>
        <h3 className={styles.sectionTitle}>Wishlist</h3>
        <div className={styles.sectionItemsGrid}>
          {item.map((data, index) => {
            return (
              <div style={{ position: "relative" }}>
                <div
                  className={styles.removeBtn}
                  onClick={() => handleRemoveFromWishlist(data._id, index)}
                >
                  <RemoveBtn />
                </div>
                <Link href={`/product/${data._id}`}>
                  <div className={styles.sectionGridItem}>
                    <Image
                      className={styles.sectionGridItemImage}
                      src={data.image}
                      height={180}
                      width={180}
                    ></Image>
                    <div className={styles.sectoinGridItemDetail}>
                      <div className={styles.sectionGridItemName}>
                        {data.name}
                      </div>
                      <div className={styles.sectionGridItemPrice}>
                        Rs. {data.price}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
