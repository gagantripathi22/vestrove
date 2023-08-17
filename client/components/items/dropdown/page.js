import React, { useEffect, useState } from 'react';
import styles from '../../../styles/dropdown/dropdown.module.css';

const DropdownArea = ({
  sectionTitle,
  dropboxItems,
  subCat,
  initialValue,
  defaultOptionTitle,
}) => {
  const [checkItems, setCheckItems] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  useEffect(() => {
    dropboxItems && setSubCategory(dropboxItems);
  }, [dropboxItems]);
  const handleItemChange = (e) => {
    subCat(e.target.value);
    setSelectedItem(e.target.value);
  };
  useEffect(() => {
    setSelectedItem(initialValue);
  }, []);
  useEffect(() => {}, [selectedItem]);
  return (
    <div className={styles.checkBoxAreaContainer}>
      <div className={styles.sectionTitle}>{sectionTitle}</div>
      <div className={styles.checkBoxesContainer}>
        <select
          value={selectedItem}
          onChange={handleItemChange}
          className={styles.dropdownMenu}
        >
          <option value="" disabled selected hidden>
            Select {defaultOptionTitle}
          </option>
          {subCategory.map((item) => {
            return (
              <option
                value={item.name}
                className={styles.dropdownItem}
                key={item.id}
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DropdownArea;
