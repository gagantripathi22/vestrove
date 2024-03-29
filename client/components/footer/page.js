import React from 'react';
import styles from '../../styles/footer/footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerSpacing}>
        <h1 className={styles.footerHeading}>VESTROVE</h1>
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
          This site is a project developed by{' '}
          <a target="_blank" href={'https://github.com/gagantripathi22'}>
            <span className={styles.footerSiteInfoLink}>@gagantripathi22</span>
          </a>
          . Check out{' '}
          <a target="_blank" href={'https://gagan.vercel.app'}>
            <span className={styles.footerSiteInfoLink}>portfolio</span>
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Footer;
