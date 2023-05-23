import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../../styles/profile/profile.module.scss";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import RemoveBtn from "../../items/removeBtn/page";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/app/Redux/features/user/userSlice";

const Cart = () => {
  const [item, setItems] = useState([]);
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  const dispatch = useDispatch();

  const getCart = async () => {
    const getToken = localStorage.getItem("access-token");

    const getTokenData = await jwt_decode(getToken);
    console.log("getTokenData : ", getTokenData, getToken);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getCartUserData = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/getCart`,
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
    if (getCartUserData.status == 200) {
      const res = await getCartUserData.json();
      console.log(res.cart);
      return res.cart;
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };
  const updateCartState = async () => {
    setItems(await getCart());
  };
  const handleRemoveFromWishlist = async (itemId, itemIndex) => {
    const userEmail = await myData.email;
    const userToken = await myData.token;
    console.log(userEmail, itemId, userToken);
    const tryLogin = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/removeFromCart`,
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
      dispatch(removeFromCart(itemId));
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
    updateCartState();
  }, []);
  return (
    <div className={styles.basicDetailSection}>
      <h3 className={styles.sectionTitle}>Cart</h3>
      <div className={styles.sectionItemsGrid}>
        {item.map((data, index) => {
          return (
            <div
              style={{ position: "relative" }}
              className={styles.gridItemMainContainer}
            >
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
  );
};

export default Cart;
