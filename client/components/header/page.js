"use client";
import React from "react";
import styles from "../../styles/header/header.module.css";
import Navbar from "./navbar/page";
import UserControls from "./userControls/page";
import Link from "next/link";
import Decode from "jwt-decode";

const Header = () => {
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
            7/stop
          </h1>
        </Link>
        <Navbar />
        <UserControls />
      </div>
    </div>
  );
};

export default Header;
