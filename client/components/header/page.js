"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/header/header.module.css";
import Navbar from "./navbar/page";
import UserControls from "./userControls/page";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "../../public/arrow.svg";
import NavItems from "./navbar/navItems.json";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "@/app/Redux/features/user/userSlice";

const Header = () => {
  const userSelector = (state) => state.user;
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogout = async () => {
    const checkLogout = localStorage.removeItem("access-token");
    setIsUserLoggedIn(false);
    dispatch(resetStore());
  };

  useEffect(() => {
    console.log("is user loggedi in : ", isUserLoggedIn);
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (userData.token) setIsUserLoggedIn(true);
  }, [userData.token]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSpacing}>
        <Link href={"/"}>
          <h1 className={styles.heading}>sevnstop</h1>
        </Link>
        <div
          className={styles.mobileNavBtn}
          style={{ transform: mobileNavVisible && "rotate(180deg)" }}
          onClick={() => setMobileNavVisible((prev) => !prev)}
        >
          <Image src={ArrowIcon} height={30} width={30} />
        </div>
        {/* {mobileNavVisible && ( */}

        {/* )} */}
        <Navbar />
        <UserControls />
      </div>
      <div
        className={
          mobileNavVisible
            ? `${styles.mobileNavBar} ${styles.mobileNavBarVisible}`
            : styles.mobileNavBar
        }
      >
        <section className={styles.categorySection}>
          <Link href={`/profile`}>
            <h5 className={styles.categorySectionTitle}>Profile</h5>
          </Link>
          {!isUserLoggedIn ? (
            <div className={styles.mobileNavSubItemList}>
              <Link href={`/profile`}>
                <div
                  className={styles.mobileNavSubItem}
                  onClick={() => {
                    setMobileNavVisible((prev) => !prev);
                  }}
                >
                  Sign in
                </div>
              </Link>
            </div>
          ) : (
            <div className={styles.mobileNavSubItemList}>
              <Link href={`/profile`}>
                <div
                  className={styles.mobileNavSubItem}
                  onClick={() => {
                    setMobileNavVisible((prev) => !prev);
                  }}
                >
                  Profile
                </div>
              </Link>
              <Link href={`/cart`}>
                <div
                  className={styles.mobileNavSubItem}
                  onClick={() => {
                    setMobileNavVisible((prev) => !prev);
                  }}
                >
                  Cart
                </div>
              </Link>
              <Link href={`/wishlist`}>
                <div
                  className={styles.mobileNavSubItem}
                  onClick={() => {
                    setMobileNavVisible((prev) => !prev);
                  }}
                >
                  Wishlist
                </div>
              </Link>
              <div
                className={styles.mobileNavSubItem}
                onClick={async () => {
                  await handleLogout();
                  setMobileNavVisible((prev) => !prev);
                }}
              >
                Logout
              </div>
            </div>
          )}
        </section>
        {NavItems.map((item) => {
          return (
            <section className={styles.categorySection} key={item.id}>
              <Link href={`/${item.name}`}>
                <h5 className={styles.categorySectionTitle}>{item.name}</h5>
              </Link>
              <div className={styles.mobileNavSubItemList}>
                {item.subcategories?.map((subcat) => {
                  return (
                    <Link
                      href={`/${item.name}?type=${subcat.name.toLowerCase()}`}
                      key={item.id}
                    >
                      <div
                        className={styles.mobileNavSubItem}
                        onClick={() => {
                          setMobileNavVisible((prev) => !prev);
                        }}
                      >
                        {subcat.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
