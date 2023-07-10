"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/header/header.module.css";
import NavItemList from "./navItems.json";
import Image from "next/image";
import FemaleNewArrivalImg1 from "../../../public/categoryNewArrival/female1.jpg";
import FemaleNewArrivalImg2 from "../../../public/categoryNewArrival/female2.jpg";
import MaleNewArrivalImg1 from "../../../public/categoryNewArrival/male1.jpg";
import MaleNewArrivalImg2 from "../../../public/categoryNewArrival/male2.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [currentNavItem, setCurrentNavItem] = useState(null);
  const [currentNavExpandState, setCurrentNavExpandState] = useState(
    "navbarExpandContainer"
  );
  const [navItems, setNavItems] = useState(NavItemList);

  const getCurrentNavbarExpandClass = () => {
    if (currentNavExpandState === "navbarExpandContainer")
      return `${styles.navbarExpandContainer}`;
    else if (currentNavExpandState === "navbarExpandVisible")
      return `${styles.navbarExpandContainer} ${styles.navbarExpandVisible}`;
  };

  const renderNavSubCategories = (itemId) => {
    return (
      <div id={itemId} className={styles.navSubItemContainer}>
        {navItems[itemId].subcategories?.map((subcat) => {
          return (
            <Link
              href={`/${
                itemId === 0 ? "women" : itemId === 1 ? "men" : "watches"
              }?type=${subcat.name.toLowerCase()}`}
              key={subcat.id}
              // href={{
              //   pathname: `/${
              //     itemId === 0 ? "women" : itemId === 1 ? "men" : "watches"
              //   }?type=${subcat.name.toLowerCase()}`,
              //   query: { subCategory: subcat.name },
              // }}
            >
              <div
                className={styles.navSubItem}
                onClick={() => router.refresh()}
              >
                <div className={styles.navSubItemText}>{subcat.name}</div>
                <div className={styles.navSubItemHoverEffect}></div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderItemListOfSubCategory = (itemId) => {
    return <div></div>;
  };

  const renderCategoryNewArrival = (itemId) => {
    return (
      <div className={styles.categoryNewArrivalContainer}>
        <div className={styles.categoryNewArrivalItem}>
          {itemId === 0 ? (
            <>
              <Image
                alt=""
                className={styles.categoryNewArrivalItemImage}
                src={FemaleNewArrivalImg1}
              />
              <div className={styles.categoryNewArrivalItemText}>
                Fresh Linen
              </div>
            </>
          ) : itemId === 1 ? (
            <>
              <Image
                alt=""
                className={styles.categoryNewArrivalItemImage}
                src={MaleNewArrivalImg1}
              />
              <div className={styles.categoryNewArrivalItemText}>
                Summer Time
              </div>
            </>
          ) : itemId === 2 ? (
            <>
              <Image
                alt=""
                className={styles.categoryNewArrivalItemImage}
                src={WatchNewArrivalImg1}
              />
              <div className={styles.categoryNewArrivalItemText}>
                Male Watches
              </div>
            </>
          ) : null}
        </div>
        <div style={{ width: 20 }}></div>
        <div className={styles.categoryNewArrivalItem}>
          {itemId === 0 ? (
            <>
              <Image
                alt=""
                className={styles.categoryNewArrivalItemImage}
                src={FemaleNewArrivalImg2}
              />
              <div className={styles.categoryNewArrivalItemText}>
                Spring Collection
              </div>
            </>
          ) : itemId === 1 ? (
            <>
              <Image
                alt=""
                className={styles.categoryNewArrivalItemImage}
                src={MaleNewArrivalImg2}
              />
              <div className={styles.categoryNewArrivalItemText}>
                Light Layers
              </div>
            </>
          ) : itemId === 2 ? (
            <>
              <Image
                alt=""
                className={styles.categoryNewArrivalItemImage}
                src={WatchNewArrivalImg2}
              />
              <div className={styles.categoryNewArrivalItemText}>
                Female Watches
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.navbarContainerCenter}>
        <div
          className={styles.navbarContainer}
          onMouseEnter={() => setCurrentNavExpandState("navbarExpandVisible")}
          onMouseLeave={() => {
            setCurrentNavExpandState("navbarExpandContainer");
          }}
        >
          {navItems.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className={styles.navbarItemContainer}
                  onMouseEnter={() => {
                    setCurrentNavExpandState("navbarExpandVisible");
                    setCurrentNavItem(item.name);
                  }}
                >
                  <Link
                    href={`/${item.name}`}
                    onClick={() => console.log("click click!")}
                  >
                    <div className={styles.navbarItem}>
                      <h5 className={styles.navbarItemTitle}>{item.name}</h5>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
        <div
          className={getCurrentNavbarExpandClass()}
          // className={styles.navbarExpandVisible}
          onMouseEnter={() => {
            if (currentNavItem !== null)
              setCurrentNavExpandState("navbarExpandVisible");
          }}
          onMouseLeave={() => {
            setCurrentNavExpandState("navbarExpandContainer");
            setCurrentNavItem(null);
          }}
        >
          <div className={styles.navbarExpandSpacing}>
            {currentNavItem === "women" ? (
              <>
                {renderNavSubCategories(0)}
                {renderCategoryNewArrival(0)}
              </>
            ) : currentNavItem === "men" ? (
              <>
                {renderNavSubCategories(1)}
                {renderCategoryNewArrival(1)}
              </>
            ) : currentNavItem === "watches" ? (
              <>
                {renderItemListOfSubCategory(2)}
                {renderCategoryNewArrival(2)}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
