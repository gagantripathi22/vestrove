import React from "react";
import styles from "../../../styles/profile/profile.module.scss";

const Profile = () => {
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
  return (
    <>
      <section className={styles.basicDetailSection}>
        <h3 className={styles.sectionTitle}>Profile</h3>
        <form className={styles.basicDetailForm}>
          {renderPlainInput("First Name")}
          {renderPlainInput("Last Name")}
          <span></span>
          {renderPlainInput("Email")}
        </form>
      </section>
      <section className={styles.passwordSection}>
        <h3 className={styles.sectionTitle}>Password</h3>
        <form className={styles.basicDetailForm}>
          {renderPasswordInput("current password")}
          <span></span>
          <span></span>
          {renderPasswordInput("new password")}
          {renderPasswordInput("confirm new password")}
        </form>
      </section>
    </>
  );
};

export default Profile;
