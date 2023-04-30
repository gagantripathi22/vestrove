import React, { useEffect, useState } from "react";
import styles from "../../styles/login/login.module.css";
import Button from "../components/button/index";
import ShowcaseImagesList from "./showcaseImages.json";
import Image from "next/image";

const Login = () => {
  const [showcaseImages, setShowcaseImages] = useState(ShowcaseImagesList);
  const [currentShowcaseImage, setCurrentShowcaseImage] = useState(0);
  const [showImageChangeEffect, setShowImageChangeEffect] = useState(false);
  const renderPlainInput = (name) => {
    return (
      <div className={styles.plainInputContainer}>
        <h5 className={styles.plainInputName}>{name}</h5>
        <input
          type="text"
          // id="fname"
          // name="fname"
          className={styles.plainInputField}
        ></input>
      </div>
    );
  };

  const renderPasswordInput = (name) => {
    return (
      <div className={styles.plainInputContainer}>
        <h5 className={styles.plainInputName}>{name}</h5>
        <input
          type="password"
          // id="fname"
          // name="fname"
          className={styles.plainInputField}
        ></input>
      </div>
    );
  };

  let timer;

  const updateCount = () => {
    timer = setInterval(() => {
      if (currentShowcaseImage !== showcaseImages.length) {
        // console.log("if ", currentShowcaseImage, " // ", showcaseImages.length);
        setCurrentShowcaseImage((prevCount) => prevCount + 1);
        setShowImageChangeEffect(true);
      } else {
        // console.log(
        //   "else ",
        //   currentShowcaseImage,
        //   " // ",
        //   showcaseImages.length
        // );
        setShowImageChangeEffect(true);
        setCurrentShowcaseImage(0);
      }
    }, 5000);
  };

  useEffect(() => {
    updateCount();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(currentShowcaseImage);
    let resetCounter;
    if (currentShowcaseImage >= showcaseImages.length - 1)
      resetCounter = setTimeout(() => setCurrentShowcaseImage(0), 4000);

    return () => clearTimeout(resetCounter);
  }, [currentShowcaseImage]);

  useEffect(() => {
    showImageChangeEffect
      ? setShowImageChangeEffect(false)
      : setShowImageChangeEffect(true);
  }, [showImageChangeEffect]);

  const getCurrentImageEffectClass = () => {
    if (showImageChangeEffect === false)
      return `${styles.showcaseImageChangeEffectIdle}`;
    else `${styles.showcaseImageChangeEffect}`;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginSpacing}>
        <div className={styles.showcaseSection}>
          <div className={styles.showcaseImageContainer}>
            <Image
              src={showcaseImages[currentShowcaseImage]?.src}
              width={400}
              height={100}
              className={styles.showcaseImage}
            />
            <div className={styles.categoryNewArrivalItemText}>
              {showcaseImages[currentShowcaseImage]?.name}
            </div>
            <div className={getCurrentImageEffectClass()}></div>
          </div>
        </div>
        <div className={styles.loginSection}>
          <div className={styles.loginFormContainer}>
            <h2 className={styles.loginSectionHeading}>Login</h2>

            <form className={styles.loginForm}>
              {renderPlainInput("email")}
              {renderPasswordInput("password")}
              <Button text="Login" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
