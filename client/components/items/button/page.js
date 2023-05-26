import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/button/button.module.css";
import LoadingSVG from "../../../public/loading-sphere.svg";

const Button = ({ buttonHeight, buttonWidth, text, loading }) => {
  const [isLoading, setIsLoading] = useState(loading);
  useEffect(() => {
    console.log("isLoading : ", loading);
    setIsLoading(loading);
  }, [loading]);
  return (
    <div
      className={styles.buttonContainer}
      style={{
        height: buttonHeight ? buttonHeight : 50,
        width: buttonWidth ? buttonWidth : "fit-content",
      }}
    >
      {!isLoading ? (
        <>
          <div className={styles.buttonText}>{text ? text : "Button Text"}</div>
          <div className={styles.buttonHover}></div>
        </>
      ) : (
        <Image
          src={LoadingSVG}
          height={30}
          className={styles.loadingSvg}
        ></Image>
      )}
    </div>
  );
};

export default Button;
