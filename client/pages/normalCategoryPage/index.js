import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/normalCategoryPage/normalcategorypage.module.scss";
import CheckBoxArea from "../components/checkboxArea/index";
import FilterIcon from "../../public/filter.svg";

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
      <div className={styles.sectionFilterMobile}>
        <div className={styles.filterBtn}>
          <Image className={styles.filterIcon} src={FilterIcon} />
          <div className={styles.filterText}>Filter</div>
        </div>
      </div>
      <div className={styles.normalCatSpacing}>
        <div className={styles.filterSectionSpacing}>
          <div className={styles.filterSection}>
            <CheckBoxArea sectionTitle="Type" />
          </div>
        </div>
        <div className={styles.itemListSection}>
          {itemList.map((item) => {
            return (
              // <div className={styles.listItem} style={{ width: 300 }}>
              <div className={styles.listItem}>
                <Image
                  className={styles.listItemImage}
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/fashion-brand-153dd.appspot.com/o/files%2Fdresses-f3.jpeg?alt=media&token=19337f2d-952b-496f-9847-407f37a21aa2"
                  }
                  width={200}
                  height={275}
                ></Image>
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
