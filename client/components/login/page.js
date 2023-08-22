'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/login/login.module.css';
import Button from '../items/button/page';
import ShowcaseImagesList from './showcaseImages.json';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import VerifyToken from '../../services/verifyToken';
import jwt_decode from 'jwt-decode';
import InitializeData from '@/app/Redux/features/initialize/initialize';
import LoginHero from '../../public/women.webp';
import { useDispatch } from 'react-redux';
import {
  addToWishlist,
  addToCart,
  addEmail,
  addToken,
  addFirstname,
  addLastname,
  addId,
} from '@/app/Redux/features/user/userSlice';

const Login = ({ handleLogin, handleSignUp }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const tokenVerification = async () => {
    const tokenDecoded = await VerifyToken();
    if (tokenDecoded) {
      router.replace('/');
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);
  const [showcaseImages, setShowcaseImages] = useState(ShowcaseImagesList);
  const [currentShowcaseImage, setCurrentShowcaseImage] = useState(0);
  const [showImageChangeEffect, setShowImageChangeEffect] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userInputInfo, setUserInputInfo] = useState('');

  // user data login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // user data signup
  const [signupEmail, setSignupEmail] = useState('');
  const [signupFirstname, setSignupFirstname] = useState('');
  const [signupLastname, setSignupLastname] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const getCurrentImageEffectClass = () => {
    if (showImageChangeEffect === false)
      return `${styles.showcaseImageChangeEffectIdle}`;
    else `${styles.showcaseImageChangeEffect}`;
  };

  const handleLoginBtnClick = async () => {
    setLoginLoading(true);
    const res = await handleLogin(loginEmail, loginPassword);
    if (res.token) {
      await localStorage.setItem('access-token', res.token);
      await addDataToRedux(res.token);
    } else {
      setUserInputInfo(res);
      setSignupLoading(false);
    }
  };

  const handleSignUpBtnClick = async () => {
    if (signupPassword.length >= 8) {
      setSignupLoading(true);
      const res = await handleSignUp(
        signupFirstname,
        signupLastname,
        signupEmail,
        signupPassword
      );
      console.log(res);
      if (res.message) {
        console.log('409');
        setUserInputInfo(res.message);
        setSignupLoading(false);
      } else if (res.token) {
        console.log('200');
        await localStorage.setItem('access-token', res.token);
        await addDataToRedux(res.token);
      } else {
        console.log('404');
        setUserInputInfo(false);
      }
    } else {
      setUserInputInfo('Password should be atleast 8 character long');
    }
  };

  const addDataToRedux = async (token) => {
    const getToken = await localStorage.getItem('access-token');
    const getTokenData = await jwt_decode(token);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getLoginUserData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserData`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${getToken}`,
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
      router.push('/');
    } else {
      return 'invalid credentials';
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginSpacing}>
        <div className={styles.showcaseSection}>
          <div className={styles.showcaseImageContainer}>
            <Image
              alt=""
              // src={showcaseImages[currentShowcaseImage]?.src}
              src={LoginHero}
              width={400}
              height={100}
              className={styles.showcaseImage}
            />
            {/* <div className={styles.categoryNewArrivalItemText}>
              {showcaseImages[currentShowcaseImage]?.name}
            </div> */}
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
                    type="email"
                    value={loginEmail}
                    name="email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>password</h5>
                  <input
                    type="password"
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div onClick={() => handleLoginBtnClick()}>
                  <Button text="Login" loading={loginLoading} />
                </div>
                <div
                  className={styles.createAccText}
                  onClick={() => {
                    setShowLogin((prev) => !prev);
                    setUserInputInfo('');
                  }}
                >
                  Create New Account ?
                </div>
                <div className={styles.userInputInfo}>{userInputInfo}</div>
              </form>
            </div>
          ) : (
            <div className={styles.loginFormContainer}>
              <h2 className={styles.loginSectionHeading}>Sign Up</h2>

              <form className={styles.loginForm} autoComplete="off">
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>first name</h5>
                  <input
                    type="text"
                    value={signupFirstname}
                    onChange={(e) => setSignupFirstname(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div className={styles.plainInputContainer}>
                  <h5 className={styles.plainInputName}>last name</h5>
                  <input
                    type="text"
                    value={signupLastname}
                    onChange={(e) => setSignupLastname(e.target.value)}
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
                    autoComplete="off"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className={styles.plainInputField}
                  ></input>
                </div>
                <div onClick={() => handleSignUpBtnClick()}>
                  <Button text="Sign up" loading={signupLoading} />
                </div>
                <div
                  className={styles.createAccText}
                  onClick={() => {
                    setShowLogin((prev) => !prev);
                    setUserInputInfo('');
                  }}
                >
                  Already Have An Account ?
                </div>
                <div className={styles.userInputInfo}>{userInputInfo}</div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
