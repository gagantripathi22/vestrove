"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/profile/profile.module.scss";
import ProfileSection from "./profile/page";
import ShipmentPaymentSection from "./shipmentpayment/page";
import WishlistSection from "./wishlist/page";
import CartSection from "./cart/page";
import VerifyToken from "@/services/verifyToken";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const searchPathname = usePathname();

  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [currentSection, setCurrentSection] = useState("");
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
      alias: "shipping",
    },
  ]);

  const tokenVerification = async () => {
    const tokenDecoded = await VerifyToken();
    console.log("token decoded : ", tokenDecoded);
    if (!tokenDecoded) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    tokenVerification();
    setCurrentSection(searchPathname.substring(1));
  }, []);

  const handleSectionChangeWithUrl = (sectionName) => {
    router.push(`/${sectionName}`);
  };

  return (
    <div className={styles.profileContainer}>
      {/* <div className={styles.sectionHeading}>profile</div> */}
      <div className={styles.profileSpacing}>
        <div className={styles.filterSection}>
          {filterItems.map((item) => {
            return (
              <div
                className={styles.filterItem}
                onClick={() => handleSectionChangeWithUrl(item.alias)}
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
          ) : currentSection === "shipping" ? (
            <ShipmentPaymentSection />
          ) : currentSection === "wishlist" ? (
            <WishlistSection wishList={wishList} />
          ) : currentSection === "cart" ? (
            <CartSection cartList={cartList} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
