import React from "react";
import Image from "next/image";
import styles from "../../../../styles/home/heroCard/herocard.module.css";
import MaleHero2 from "../../../../public/male2bg.jpg";
import FemaleHero2 from "../../../../public/female2bg.jpg";
import WatchesHero2 from "../../../../public/watches2bg.jpg";
import WomenHeroImg from "../../../../public/women-hero-img-2.jpg";
import MenHeroImg from "../../../../public/men-hero-img-2.jpg";
import Link from "next/link";

const BigCard = () => {
  return (
    <>
      <div className={styles.bigCardsContainer}>
        <div className={styles.cardContainerBig}>
          <Link href={"/women"}>
            <Image
              alt=""
              className={styles.bigCard}
              src={WomenHeroImg}
              quality={100}
            />
            <div className={styles.cardTitleContainer}>
              <h1 className={styles.cardTitle}>shop women</h1>
              <div className={styles.cardTitleUnderline}></div>
            </div>
          </Link>
        </div>
        {/* <div style={{ height: 9 }}></div> */}
        <div className={styles.cardContainerBig}>
          <Link href={"/men"}>
            <Image
              alt=""
              className={styles.bigCard}
              src={MenHeroImg}
              quality={100}
            />
            <div className={styles.cardTitleContainer}>
              <h1 className={styles.cardTitle}>shop men</h1>
              <div className={styles.cardTitleUnderline}></div>
            </div>
          </Link>
        </div>
      </div>
      <div style={{ height: 9 }}></div>
      {/* <div className={styles.cardContainerWide}>
        <Link href={"/watches"}>
          <Image
            alt=""
            className={styles.wideCard}
            src={WatchesHero2}
            quality={100}
          />
          <div className={styles.cardTitleContainer}>
            <h1 className={styles.cardTitle}>watches</h1>
            <div className={styles.cardTitleUnderline}></div>
          </div>
        </Link>
      </div> */}
    </>
  );
};

export default BigCard;
