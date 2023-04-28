import React from "react";
import styles from "../../styles/header/header.module.css";
import Navbar from "./navbar/index";
import UserControls from "./userControls/index";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSpacing}>
        <h1 className={styles.heading}>seven/stop</h1>
        <Navbar />
        <UserControls />
      </div>
    </div>
  );
};

export default Header;
