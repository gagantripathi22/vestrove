import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import UserIcon from "../../../public/user.svg";
import CartIcon from "../../../public/cart.svg";
import WishlistIcon from "../../../public/wishlist.svg";
import styles from "../../../styles/header/header.module.css";

const UserControls = () => {
  const [currentControlItem, setCurrentControlItem] = useState(null);
  const [currentUserControlExpandState, setCurrentUserControlExpandState] =
    useState("userControlExpand");
  const [currentControlIndex, setCurrentControlIndex] = useState(0);
  const [controlItems, setControlItems] = useState([
    {
      heading: "Profile",
      items: [
        {
          name: "View Profile",
        },
        {
          name: "Logout",
        },
      ],
    },
    {
      heading: "Wishlist",
    },
    {
      heading: "Cart",
    },
  ]);

  useEffect(() => {
    if (currentControlItem === "profile") setCurrentControlIndex(0);
    else if (currentControlItem === "wishlist") setCurrentControlIndex(1);
    else if (currentControlItem === "cart") setCurrentControlIndex(2);
  }, [currentControlItem]);

  const getCurrentExpandClass = () => {
    if (currentUserControlExpandState === "userControlExpand")
      return `${styles.userControlExpand}`;
    else if (currentUserControlExpandState === "userControlExpandVisible")
      return `${styles.userControlExpand} ${styles.userControlExpandVisible}`;
  };

  return (
    <div className={styles.userControls}>
      <div
        className={styles.useControlIconSpacing}
        onMouseEnter={() => {
          setCurrentControlItem("profile");
          setCurrentUserControlExpandState("userControlExpandVisible");
        }}
        onMouseLeave={() => {
          setCurrentControlItem(null);
          setCurrentUserControlExpandState("userControlExpand");
        }}
      >
        <Image className={styles.userControlIcon} src={UserIcon} />
      </div>
      <div
        className={styles.useControlIconSpacing}
        onMouseEnter={() => {
          setCurrentControlItem("wishlist");
          setCurrentUserControlExpandState("userControlExpandVisible");
        }}
        onMouseLeave={() => {
          setCurrentControlItem(null);
          setCurrentUserControlExpandState("userControlExpand");
        }}
      >
        <Image className={styles.userControlIcon} src={WishlistIcon} />
      </div>
      <div
        className={styles.useControlIconSpacing}
        onMouseEnter={() => {
          setCurrentControlItem("cart");
          setCurrentUserControlExpandState("userControlExpandVisible");
        }}
        onMouseLeave={() => {
          setCurrentControlItem(null);
          setCurrentUserControlExpandState("userControlExpand");
        }}
      >
        <Image className={styles.userControlIcon} src={CartIcon} />
      </div>
      <div
        className={getCurrentExpandClass()}
        style={{
          position: "absolute",
          height:
            currentControlItem === "profile"
              ? 180
              : currentControlItem === "wishlist" ||
                currentControlItem === "cart"
              ? 300
              : 0,
        }}
      >
        <div
          className={styles.userControlExpandArrow}
          style={{
            position: "absolute",
            right:
              currentControlItem === "profile"
                ? 88
                : currentControlItem === "wishlist"
                ? 49
                : currentControlItem === "cart"
                ? 8
                : 8,
          }}
        ></div>
        <div className={styles.arrowExtraFiller}></div>
        <div className={styles.userControlExpandContainer}>
          <div className={styles.userControlExpandHeading}>
            {controlItems[currentControlIndex].heading}
          </div>
          {currentControlItem === "profile" ? (
            <div className={styles.userControlExpandItemList}>
              {controlItems[0].items.map((item) => {
                return (
                  <div className={styles.userControlExpandItem}>
                    <div className={styles.userControlExpandItemName}>
                      {item.name}
                    </div>
                    <div className={styles.useControlExpandItemHover}></div>
                  </div>
                );
              })}
            </div>
          ) : currentControlItem === "wishlist" ? (
            <div className={styles.userControlExpandItemList}></div>
          ) : (
            <div className={styles.userControlExpandItemList}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserControls;
