import React, { useState } from "react";
import styles from "../../../styles/checkBoxArea/checkboxarea.module.css";

const CheckBoxArea = ({ sectionTitle, checkboxItems }) => {
  const [checkItems, setCheckItems] = useState([
    {
      id: 1,
      name: "Jeans",
    },
    {
      id: 2,
      name: "Shorts",
    },
    {
      id: 3,
      name: "Shorts",
    },
    {
      id: 4,
      name: "Shorts",
    },
    {
      id: 5,
      name: "Shorts",
    },
    {
      id: 6,
      name: "Shorts",
    },
    {
      id: 7,
      name: "Shorts",
    },
  ]);
  return (
    <div className={styles.checkBoxAreaContainer}>
      <div className={styles.sectionTitle}>{sectionTitle}</div>
      <div className={styles.checkBoxesContainer}>
        {checkItems.map((item) => {
          return (
            <div className={styles.checkBoxItem}>
              <input type="checkbox"></input>
              <div className={styles.checkBoxText} id={item.id}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckBoxArea;
