"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "../../../public/user.svg";
import CartIcon from "../../../public/cart.svg";
import WishlistIcon from "../../../public/wishlist.svg";
import styles from "../../../styles/header/header.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "@/app/Redux/features/user/userSlice";

const UserControls = () => {
  const userSelector = (state) => state.user;
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentControlItem, setCurrentControlItem] = useState(null);
  const [currentUserControlExpandState, setCurrentUserControlExpandState] =
    useState("userControlExpand");
  const [currentControlIndex, setCurrentControlIndex] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogout = async () => {
    const checkLogout =
      typeof window !== "undefined" && localStorage.removeItem("access-token");
    dispatch(resetStore());
    setIsUserLoggedIn(false);
    console.log("? : ", checkLogout);
  };

  const handleLoginRoute = () => {
    router.push("/login");
  };

  const handleProfileRoute = () => {
    router.push("/profile");
  };

  useEffect(() => {
    if (userData.token) setIsUserLoggedIn(true);
  }, [userData.token]);

  const [controlItems, setControlItems] = useState([
    {
      heading: "Profile",
      loggedInItems: [
        {
          name: "View Profile",
          path: "/profile",
          action: "profile",
        },
        {
          name: "Logout",
          path: "/logout",
          action: "logout",
        },
      ],
      loggedOutItems: [
        {
          name: "Sign in",
          path: "/login",
          action: "login",
        },
      ],
    },
    {
      heading: "Wishlist",
      path: "/wishlist",
    },
    {
      heading: "Cart",
      path: "/cart",
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
    <div
      className={styles.userControls}
      onMouseLeave={() => {
        setCurrentControlItem(null);
        setCurrentUserControlExpandState("userControlExpand");
      }}
    >
      <Link href={"/profile"}>
        <div
          className={styles.useControlIconSpacing}
          onMouseEnter={() => {
            setCurrentControlItem("profile");
            setCurrentUserControlExpandState("userControlExpandVisible");
          }}
        >
          <Image alt="" className={styles.userControlIcon} src={UserIcon} />
        </div>
      </Link>
      <Link href={"/wishlist"}>
        <div
          className={styles.useControlIconSpacing}
          onMouseEnter={() => {
            setCurrentControlItem("wishlist");
            setCurrentUserControlExpandState("userControlExpandVisible");
          }}
        >
          <Image alt="" className={styles.userControlIcon} src={WishlistIcon} />
        </div>
      </Link>
      <Link href={"/cart"}>
        <div
          className={styles.useControlIconSpacing}
          onMouseEnter={() => {
            setCurrentControlItem("cart");
            setCurrentUserControlExpandState("userControlExpandVisible");
          }}
        >
          <Image alt="" className={styles.userControlIcon} src={CartIcon} />
        </div>
      </Link>

      <div
        className={getCurrentExpandClass()}
        style={{
          position: "absolute",
          height: !isUserLoggedIn
            ? 130
            : currentControlItem === "profile"
            ? 170
            : currentControlItem === "wishlist" || currentControlItem === "cart"
            ? 75
            : 0,
        }}
      >
        <div
          className={styles.userControlExpandArrow}
          style={{
            position: "absolute",
            right:
              currentControlItem === "profile"
                ? 78
                : currentControlItem === "wishlist"
                ? 43
                : currentControlItem === "cart"
                ? 8
                : 8,
          }}
        ></div>
        <div
          className={styles.userControlIconAndExpandSpaceFiller}
          onMouseEnter={() => {
            if (currentControlItem !== null) {
              setCurrentUserControlExpandState("userControlExpandVisible");
            }
          }}
        ></div>
        <div className={styles.arrowExtraFiller}></div>
        <div className={styles.userControlExpandContainer}>
          <div className={styles.userControlExpandHeading}>
            {controlItems[currentControlIndex].heading}
          </div>
          {currentControlItem === "profile" ? (
            <div className={styles.userControlExpandItemList}>
              {isUserLoggedIn
                ? controlItems[0]?.loggedInItems.map((item) => {
                    return (
                      <div
                        className={styles.userControlExpandItem}
                        onClick={() =>
                          item.action === "logout"
                            ? handleLogout()
                            : item.action === "login"
                            ? handleLoginRoute()
                            : item.action === "profile"
                            ? handleProfileRoute()
                            : null
                        }
                        key={item.id}
                      >
                        <div className={styles.userControlExpandItemName}>
                          {item.name}
                        </div>
                        <div className={styles.useControlExpandItemHover}></div>
                      </div>
                    );
                  })
                : controlItems[0]?.loggedOutItems.map((item) => {
                    return (
                      <div
                        className={styles.userControlExpandItem}
                        onClick={() =>
                          item.action === "logout"
                            ? handleLogout()
                            : item.action === "login"
                            ? handleLoginRoute()
                            : null
                        }
                        key={item.id}
                      >
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
