"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/profile/profile.module.scss";
import { useSelector } from "react-redux";
import Button from "@/components/items/button/page";

const Profile = ({ handleProfileUpdate, handlePasswordUpdate }) => {
  const userInfoSelector = (state) => state.user;
  const userInfo = useSelector(userInfoSelector);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isProfileUpdating, setIsProfileIsUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordIsUpdating] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setFirstname(userInfo.firstname);
    setLastname(userInfo.lastname);
    setEmail(userInfo.email);
  }, [userInfo]);

  const updateProfile = async () => {
    setIsProfileIsUpdating(true);
    await handleProfileUpdate(
      userInfo._id,
      localStorage.getItem("access-token"),
      firstname,
      lastname,
      email
    );
    setIsProfileIsUpdating(false);
  };

  const updatePassword = async () => {
    setIsPasswordIsUpdating(true);
    if (newPassword === confirmPassword) {
      await handlePasswordUpdate(
        userInfo._id,
        localStorage.getItem("access-token"),
        currentPassword,
        newPassword
      );
    } else {
      alert("passwords do not match");
    }
    setIsPasswordIsUpdating(false);
  };

  const renderPlainInput = (inputTitle, value, callbackValue) => {
    return (
      <div className={styles.plainInputContainer}>
        <h5 className={styles.plainInputName}>{inputTitle}</h5>
        <input
          type="text"
          // id="fname"
          // name="fname"
          value={value}
          onChange={(e) => callbackValue(e.target.value)}
          className={styles.plainInputField}
        ></input>
      </div>
    );
  };
  const renderPasswordInput = (inputTitle, value, callbackValue) => {
    return (
      <div className={styles.plainInputContainer}>
        <h5 className={styles.plainInputName}>{inputTitle}</h5>
        <input
          type="password"
          // id="fname"
          // name="fname"
          value={value}
          onChange={(e) => callbackValue(e.target.value)}
          className={styles.plainInputField}
        ></input>
      </div>
    );
  };
  return (
    <>
      <section className={styles.basicDetailSection}>
        <h3 className={styles.sectionTitle}>Profile</h3>
        <form className={styles.basicDetailForm}>
          {renderPlainInput("First Name", firstname, setFirstname)}
          {renderPlainInput("Last Name", lastname, setLastname)}
          <span></span>
          {renderPlainInput("Email", email, setEmail)}
        </form>
        <div className={styles.buttonContainer} onClick={() => updateProfile()}>
          <Button text="Update Profile" loading={isProfileUpdating} />
        </div>
      </section>
      <section className={styles.passwordSection}>
        <h3 className={styles.sectionTitle}>Password</h3>
        <form className={styles.basicDetailForm}>
          {renderPasswordInput(
            "current password",
            currentPassword,
            setCurrentPassword
          )}
          <span></span>
          <span></span>
          {renderPasswordInput("new password", newPassword, setNewPassword)}
          {renderPasswordInput(
            "confirm new password",
            confirmPassword,
            setConfirmPassword
          )}
        </form>
        <div
          className={styles.buttonContainer}
          onClick={() => updatePassword()}
        >
          <Button text="Update Password" loading={isPasswordUpdating} />
        </div>
      </section>
    </>
  );
};

export default Profile;
