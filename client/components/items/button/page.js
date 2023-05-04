import React from "react";
import styles from "../../../styles/button/button.module.css";

const Button = ({ buttonHeight, buttonWidth, text }) => {
  return (
    <div
      className={styles.buttonContainer}
      style={{
        height: buttonHeight ? buttonHeight : 50,
        width: buttonWidth ? buttonWidth : 140,
      }}
    >
      <div className={styles.buttonText}>{text ? text : "Button Text"}</div>
      <div className={styles.buttonHover}></div>
    </div>
  );
};

export default Button;
