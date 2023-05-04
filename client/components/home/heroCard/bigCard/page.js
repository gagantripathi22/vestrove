import React from "react";
import Image from "next/image";
import styles from "../../../../styles/home/heroCard/herocard.module.css";
import MaleHero from "../../../../public/male.jpg";
import FemaleHero from "../../../../public/female.jpg";
import WatchesHero from "../../../../public/watches.jpg";

const BigCard = () => {
  return (
    <>
      <div className={styles.bigCardsContainer}>
        <div className={styles.cardContainerBig}>
          <Image alt="" className={styles.bigCard} src={FemaleHero} />
          <h1 className={styles.cardTitle}>women</h1>
        </div>
        <div style={{ width: 26 }}></div>
        <div className={styles.cardContainerBig}>
          <Image alt="" className={styles.bigCard} src={MaleHero} />
          <h1 className={styles.cardTitle}>men</h1>
        </div>
      </div>
      <div style={{ height: 9 }}></div>
      <div className={styles.cardContainerWide}>
        <Image alt="" className={styles.wideCard} src={WatchesHero} />
        <h1 className={styles.cardTitle}>watches</h1>
      </div>
    </>
  );
};

export default BigCard;
