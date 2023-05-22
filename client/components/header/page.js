"use client";
import React, { useState } from "react";
import styles from "../../styles/header/header.module.css";
import Navbar from "./navbar/page";
import UserControls from "./userControls/page";
import Link from "next/link";
import Decode from "jwt-decode";
import Image from "next/image";
import ArrowIcon from "../../public/arrow.svg";
import NavItems from "./navbar/navItems.json";

const Header = () => {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSpacing}>
        <Link href={"/"}>
          <h1
            className={styles.heading}
            onClick={() => {
              console.log(localStorage.getItem("access-token"));
              console.log(Decode(localStorage.getItem("access-token")));
            }}
          >
            sevnstop
          </h1>
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
        {NavItems.map((item) => {
          return (
            <section className={styles.categorySection}>
              <Link href={`/${item.name}`}>
                <h5 className={styles.categorySectionTitle}>{item.name}</h5>
              </Link>
              <div className={styles.mobileNavSubItemList}>
                {item.subcategories?.map((subcat) => {
                  return (
                    <Link
                      href={`/${item.name}?type=${subcat.name.toLowerCase()}`}
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
