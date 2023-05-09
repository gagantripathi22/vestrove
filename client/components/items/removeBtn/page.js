import React from "react";
import styles from "../../../styles/removeBtn/removebtn.module.css";
import Image from "next/image";
import CrossIcon from "../../../public/cross.svg";

const RemoveBtn = () => {
  return (
    <div className={styles.removeBtnContainer}>
      <Image
        src={CrossIcon}
        height={12}
        width={12}
        className={styles.crossIcon}
      ></Image>
    </div>
  );
};

export default RemoveBtn;
