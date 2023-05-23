"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/login/login.module.css";
import Button from "../items/button/page";
import ShowcaseImagesList from "./showcaseImages.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import VerifyToken from "../../services/verifyToken";
import jwt_decode from "jwt-decode";
import InitializeData from "@/app/Redux/features/initialize/initialize";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  addToCart,
  addEmail,
  addToken,
  addFirstname,
  addLastname,
  addId,
} from "@/app/Redux/features/user/userSlice";

const Login = ({ handleLogin }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tokenVerification = async () => {
    const tokenDecoded = await VerifyToken();
    console.log("token decoded : ", tokenDecoded);
    if (tokenDecoded) {
      router.replace("/");
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);
  const [showcaseImages, setShowcaseImages] = useState(ShowcaseImagesList);
  const [currentShowcaseImage, setCurrentShowcaseImage] = useState(0);
  const [showImageChangeEffect, setShowImageChangeEffect] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userInputInfo, setUserInputInfo] = useState("");

  // user data login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // user data signup
  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // let timer;
  // const updateCount = () => {
  //   timer = setInterval(() => {
  //     if (currentShowcaseImage !== showcaseImages.length) {
  //       // console.log("if ", currentShowcaseImage, " // ", showcaseImages.length);
  //       setCurrentShowcaseImage((prevCount) => prevCount + 1);
  //       setShowImageChangeEffect(true);
  //     } else {
  //       // console.log(
  //       //   "else ",
  //       //   currentShowcaseImage,
  //       //   " // ",
  //       //   showcaseImages.length
  //       // );
  //       setShowImageChangeEffect(true);
  //       setCurrentShowcaseImage(0);
  //     }
  //   }, 5000);
  // };

  // useEffect(() => {
  //   updateCount();
  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   console.log(currentShowcaseImage);
  //   let resetCounter;
  //   if (currentShowcaseImage >= showcaseImages.length - 1)
  //     resetCounter = setTimeout(() => setCurrentShowcaseImage(0), 4000);

  //   return () => clearTimeout(resetCounter);
  // }, [currentShowcaseImage]);

  // useEffect(() => {
  //   showImageChangeEffect
  //     ? setShowImageChangeEffect(false)
  //     : setShowImageChangeEffect(true);
  // }, [showImageChangeEffect]);

  const getCurrentImageEffectClass = () => {
    if (showImageChangeEffect === false)
      return `${styles.showcaseImageChangeEffectIdle}`;
    else `${styles.showcaseImageChangeEffect}`;
  };

  const handleLoginBtnClick = async () => {
    const res = await handleLogin(loginEmail, loginPassword);
    if (res.token) {
      await localStorage.setItem("access-token", res.token);
      await addDataToRedux(res.token);
    } else {
      setUserInputInfo(res);
    }
  };

  const addDataToRedux = async (token) => {
    dispatch(addEmail("gagantripathi@gagan.com"));
    console.log("Add data to redux on login click");
    const getToken = await localStorage.getItem("access-token");
    const getTokenData = await jwt_decode(token);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    console.log(
      "addDataToRedux Token : ",
      getTokenData.fetchedUserTokenData._id
    );
    const getLoginUserData = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/getUserData`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          userId: getTokenUserId,
        }),
      }
    );
    if (getLoginUserData.status == 200) {
      const res = await getLoginUserData.json();
      const email = res.email;
      const firstname = res.firstname;
      const lastname = res.lastname;
      const wishlist = await Object.values(res.wishlist);
      const cart = await Object.values(res.cart);
      console.log("success");
      cart.forEach((item) => {
        dispatch(addToCart(item));
      });
      wishlist.forEach((item) => {
        dispatch(addToWishlist(item));
      });
      dispatch(addEmail(email));
      dispatch(addFirstname(firstname));
      dispatch(addLastname(lastname));
      dispatch(addToken(getToken));
      dispatch(addId(getTokenData.fetchedUserTokenData._id));
      router.push("/");
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginSpacing}>
        <div className={styles.showcaseSection}>
          <div className={styles.showcaseImageContainer}>
            <Image
              alt=""
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
          {showLogin ? (
            <div className={styles.loginFormContainer}>
              <h2 className={styles.loginSectionHeading}>Log In</h2>

              <form className={styles.loginForm}>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>email</h5>
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>password</h5>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div onClick={() => handleLoginBtnClick()}>
                  <Button text="Login" />
                </div>
                <div
                  className={styles.createAccText}
                  onClick={() => setShowLogin((prev) => !prev)}
                >
                  Create New Account ?
                </div>
                <div className={styles.userInputInfo}>{userInputInfo}</div>
              </form>
            </div>
          ) : (
            <div className={styles.loginFormContainer}>
              <h2 className={styles.loginSectionHeading}>Sign Up</h2>

              <form className={styles.loginForm}>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>full name</h5>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>email</h5>
                  <input
                    type="text"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>password</h5>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <Button text="Sign up" />
                <div
                  className={styles.createAccText}
                  onClick={() => setShowLogin((prev) => !prev)}
                >
                  Already Have An Account ?
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
