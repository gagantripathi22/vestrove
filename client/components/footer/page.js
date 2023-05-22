import React from "react";
import styles from "../../styles/footer/footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerSpacing}>
        <h1 className={styles.footerHeading}>sevnstop</h1>
        {/* <div className={styles.navbarContainer}>
          <div className={styles.navbarItem}>
            <h5 className={styles.navbarItemTitle}>women</h5>
          </div>
          <div className={styles.navbarItem}>
            <h5 className={styles.navbarItemTitle}>men</h5>
          </div>
          <div className={styles.navbarItem}>
            <h5 className={styles.navbarItemTitle}>watches</h5>
          </div>
        </div> */}
        <div className={styles.footerSiteInfo}>
          This site is a project developed by{" "}
          <a target="_blank" href={"https://github.com/gagantripathi22"}>
            <span className={styles.footerSiteInfoLink}>@gagantripathi22</span>
          </a>
          . Visit{" "}
          <a
            target="_blank"
            href={"https://gagantripathi22.github.io/portfolio/"}
          >
            <span className={styles.footerSiteInfoLink}>portfolio</span>
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Footer;
