import React from "react";
import styles from "../../../styles/profile/profile.module.scss";

const ShipmentPayment = () => {
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
  return (
    <>
      <section className={styles.basicDetailSection}>
        <h3 className={styles.sectionTitle}>Shipment</h3>
        <form className={styles.basicDetailForm}>
          {renderPlainInput("Address")}
        </form>
      </section>
      <section className={styles.passwordSection}>
        <h3 className={styles.sectionTitle}>Payment</h3>
        <form className={styles.basicDetailForm}>
          {renderPlainInput("Payment Details")}
        </form>
      </section>
    </>
  );
};

export default ShipmentPayment;
