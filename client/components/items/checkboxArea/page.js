import React, { useEffect, useState } from 'react';
import styles from '../../../styles/checkBoxArea/checkboxarea.module.css';

const CheckBoxArea = ({ sectionTitle, checkboxItems }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedItems({ ...selectedItems, [name]: checked });
  };
  useEffect(() => {}, [checkItems]);
  useEffect(() => {
    // checkboxItems.size > 0 && setCheckItems(checkboxItems);
    checkboxItems && setCheckItems(checkboxItems);
  }, [checkboxItems]);
  useEffect(() => {}, [selectedItems]);
  return (
    <div className={styles.checkBoxAreaContainer}>
      <div className={styles.sectionTitle}>{sectionTitle}</div>
      <div className={styles.checkBoxesContainer}>
        {Array.from(checkItems).map((item) => {
          return (
            <div className={styles.checkBoxItem} key={item.id}>
              <input
                name={item}
                className="checkbox"
                type="checkbox"
                onChange={handleCheckboxChange}
              ></input>
              <div className={styles.checkBoxText} id={item.id}>
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckBoxArea;
