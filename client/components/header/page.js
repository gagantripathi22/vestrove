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
  const [scrollYPos, setScrollYPos] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [headingFont, setHeadingFont] = useState("10vw");

  const handleLogout = async () => {
    // const checkLogout = localStorage.removeItem("access-token");
    localStorage.removeItem("access-token");
    setIsUserLoggedIn(false);
    dispatch(resetStore());
  };

  useEffect(() => {
    console.log("is user logged in : ", isUserLoggedIn);
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (userData.token) setIsUserLoggedIn(true);
  }, [userData.token]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollYPos(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 1000) {
      setHeadingFont("calc(100vw - 81vw)");
    } else {
      setHeadingFont("11em");
    }
  }, [screenWidth]);
  // calc(100vw - 81vw)
  return (
    <>
      <div
        className={styles.headerContainer}
        // style={{ height: scrollYPos > 40 ? 110 : 315 }}
      >
        <div className={styles.headerSpacing}>
          <div className={styles.headingAndNav}>
            <Link href={"/"}>
              <h1
                className={styles.heading}
                style={
                  {
                    // fontSize: scrollYPos > 40 ? 50 : headingFont,
                    // marginTop: scrollYPos > 40 ? 20 : 40,
                  }
                }
              >
                vestrove
              </h1>
            </Link>
            <div
              className={styles.mobileNavBtn}
              style={{
                transform: mobileNavVisible && "rotate(180deg)",
                opacity: scrollYPos < 50 ? 0 : 1,
              }}
              onClick={() => setMobileNavVisible((prev) => !prev)}
            >
              <Image src={ArrowIcon} height={30} width={30} />
            </div>
            {/* {mobileNavVisible && ( */}

            {/* )} */}
          </div>
          <div
            style={{
              transition: ".7s",
              // display: scrollYPos > 50 ? "block" : "none",
            }}
          >
            <Navbar />
          </div>

          <UserControls />
        </div>
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
    </>
  );
};

export default Header;
