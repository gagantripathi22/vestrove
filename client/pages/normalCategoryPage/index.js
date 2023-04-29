import React, { useState } from "react";
import styles from "../../styles/normalCategoryPage/normalcategorypage.module.scss";
import CheckBoxArea from "../components/checkboxArea/index";

const NormalCategoryPage = () => {
  const [itemList, setItemList] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  return (
    <div className={styles.normalCatContainer}>
      <div className={styles.sectionHeading}>women's clothing</div>
      <div className={styles.normalCatSpacing}>
        <div className={styles.filterSection}>
          <CheckBoxArea sectionTitle="Type" />
        </div>
        <div className={styles.itemListSection}>
          {itemList.map((item) => {
            return (
              <div className={styles.listItem} style={{ width: 300 }}>
                <div className={styles.listItemImage}></div>
                <div className={styles.listItemDetail}>
                  <div className={styles.newArrivalItemTitle}>Men Short</div>
                  <div className={styles.newArrivalItemPrice}>Rs. 1299</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NormalCategoryPage;
