import React from "react";
import styles from "../../../styles/header/header.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarItem}>
        <h5 className={styles.navbarItemTitle}>women</h5>
      </div>
      <div className={styles.navbarItem}>
        <h5 className={styles.navbarItemTitle}>men</h5>
      </div>
      <div className={styles.navbarItem}>
        <h5 className={styles.navbarItemTitle}>jewellery</h5>
      </div>
      <div className={styles.navbarItem}>
        <h5 className={styles.navbarItemTitle}>watches</h5>
      </div>
      <div className={styles.navbarItem}>
        <h5 className={styles.navbarItemTitle}>sports</h5>
      </div>
      <div className={styles.navbarItem}>
        <h5 className={styles.navbarItemTitle}>fragnance</h5>
      </div>
    </div>
  );
};

export default Navbar;
