import React from "react";
import Image from "next/image";
import styles from "../../../../styles/home/heroCard/herocard.module.css";
import MaleHero from "../../../../public/male.jpg";
import MaleHero2 from "../../../../public/male2bg.jpg";
import FemaleHero from "../../../../public/female.jpg";
import FemaleHero2 from "../../../../public/female2bg.jpg";
import WatchesHero from "../../../../public/watches.jpg";
import WatchesHero2 from "../../../../public/watches2bg.jpg";
import Link from "next/link";

const BigCard = () => {
  return (
    <>
      <div className={styles.bigCardsContainer}>
        <div className={styles.cardContainerBig}>
          <Link href={"/women"}>
            <Image alt="" className={styles.bigCard} src={FemaleHero2} />
            <div className={styles.cardTitleContainer}>
              <h1 className={styles.cardTitle}>women</h1>
              <div className={styles.cardTitleUnderline}></div>
            </div>
          </Link>
        </div>
        <div style={{ width: 26 }}></div>
        <div className={styles.cardContainerBig}>
          <Link href={"/women"}>
            <Image alt="" className={styles.bigCard} src={MaleHero2} />
            <div className={styles.cardTitleContainer}>
              <h1 className={styles.cardTitle}>men</h1>
              <div className={styles.cardTitleUnderline}></div>
            </div>
          </Link>
        </div>
      </div>
      <div style={{ height: 9 }}></div>
      <div className={styles.cardContainerWide}>
        <Link href={"/watches"}>
          <Image alt="" className={styles.wideCard} src={WatchesHero2} />
          <div className={styles.cardTitleContainer}>
            <h1 className={styles.cardTitle}>watches</h1>
            <div className={styles.cardTitleUnderline}></div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BigCard;
