"use client";
import React, { useState } from "react";
import styles from "../../styles/profile/profile.module.scss";
import ProfileSection from "./profile/page";
import ShipmentPaymentSection from "./shipmentpayment/page";
import WishlistSection from "./wishlist/page";
import CartSection from "./cart/page";

const Profile = () => {
  const [currentSection, setCurrentSection] = useState("profile");
  const [filterItems, setFilterItems] = useState([
    {
      name: "profile",
      alias: "profile",
    },
    {
      name: "wishlist",
      alias: "wishlist",
    },
    {
      name: "cart",
      alias: "cart",
    },
    {
      name: "shipping & payment",
      alias: "shipnpay",
    },
  ]);

  return (
    <div className={styles.profileContainer}>
      {/* <div className={styles.sectionHeading}>profile</div> */}
      <div className={styles.profileSpacing}>
        <div className={styles.filterSection}>
          {filterItems.map((item) => {
            return (
              <div
                className={styles.filterItem}
                onClick={() => setCurrentSection(item.alias)}
              >
                <div
                  className={styles.filterItemText}
                  style={{
                    fontWeight: currentSection === item.alias ? 500 : 400,
                  }}
                >
                  {item.name}
                </div>
                <div className={styles.filterItemHoverEffect}></div>
              </div>
            );
          })}
        </div>
        <div className={styles.optionSection}>
          {currentSection === "profile" ? (
            <ProfileSection />
          ) : currentSection === "shipnpay" ? (
            <ShipmentPaymentSection />
          ) : currentSection === "wishlist" ? (
            <WishlistSection />
          ) : currentSection === "cart" ? (
            <CartSection />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
