import React, { useEffect, useState } from "react";
import styles from "../../../styles/dropdown/dropdown.module.css";

const DropdownArea = ({ sectionTitle, dropboxItems, subCat }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [subCategory, setSubCategory] = useState(new Set());
  useEffect(() => {
    dropboxItems && setSubCategory(dropboxItems);
  }, [dropboxItems]);
  const handleItemChange = (e) => {
    subCat(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className={styles.checkBoxAreaContainer}>
      <div className={styles.sectionTitle}>{sectionTitle}</div>
      <div className={styles.checkBoxesContainer}>
        <select onChange={handleItemChange}>
          <option value="" disabled selected hidden>
            Select {sectionTitle}
          </option>
          {Array.from(subCategory).map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default DropdownArea;
