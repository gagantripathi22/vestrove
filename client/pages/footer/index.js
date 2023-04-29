import React from "react";
import styles from "../../styles/footer/footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerSpacing}>
        <h1 className={styles.footerHeading}>7/STOP</h1>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarItem}>
            <h5 className={styles.navbarItemTitle}>women</h5>
          </div>
          <div className={styles.navbarItem}>
            <h5 className={styles.navbarItemTitle}>men</h5>
          </div>
          <div className={styles.navbarItem}>
            <h5 className={styles.navbarItemTitle}>watches</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
