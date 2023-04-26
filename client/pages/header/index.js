import React from "react";
import styles from "../../styles/header/header.module.css";
import Navbar from "./navbar/index";
import Image from "next/image";
import UserIcon from "../../public/user.svg";
import CartIcon from "../../public/cart.svg";
import WishlistIcon from "../../public/wishlist.svg";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerSpacing}>
        <h1 className={styles.heading}>sevenstop</h1>
        <Navbar />
        <div className={styles.userControls}>
          <Image className={styles.userControlIcon} src={UserIcon} />
          <Image className={styles.userControlIcon} src={WishlistIcon} />
          <Image className={styles.userControlIcon} src={CartIcon} />
        </div>
      </div>
    </div>
  );
};

export default Header;
