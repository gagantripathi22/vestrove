import React from "react";
import styles from "../../styles/normalCategoryPage/normalcategorypage.module.css";
import CheckBoxArea from "../components/checkboxArea/index";

const NormalCategoryPage = () => {
  return (
    <div className={styles.normalCatContainer}>
      <div className={styles.sectionHeading}>women's clothing</div>
      <div className={styles.normalCatSpacing}>
        <div className={styles.filterSection}>
          <CheckBoxArea sectionTitle="Type" />
        </div>
        <div className={styles.itemListSection}></div>
      </div>
    </div>
  );
};

export default NormalCategoryPage;
