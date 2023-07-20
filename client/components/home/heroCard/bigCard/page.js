import React from "react";
import Image from "next/image";
import styles from "../../../../styles/home/heroCard/herocard.module.css";
import womenHero from "../../../../public/women-hero.webp";
import menHero from "../../../../public/men2.webp";
import Link from "next/link";

const BigCard = () => {
  return (
    <>
      <div className={styles.bigCardsContainer}>
        <div className={styles.cardContainerBig}>
          <Link href={"/women"} style={{ height: "100%" }}>
            <Image
              alt=""
              className={styles.bigCard}
              src={womenHero}
              quality={100}
              priority
            />
            {/* <div className={styles.cardTitleContainer}>
              <h1 className={styles.cardTitle}>shop women</h1>
              <div className={styles.cardTitleUnderline}></div>
            </div> */}
            {/* <button className={styles.bigHeroBtn}>
              <span className={styles.bigHeroBtnText}>Explore Women</span>
            </button> */}
          </Link>
        </div>
        <div className={styles.cardContainerBig}>
          <Link href={"/men"}>
            <Image
              alt=""
              className={styles.bigCard}
              src={menHero}
              quality={100}
              priority
            />
            {/* <div className={styles.cardTitleContainer}>
              <h1 className={styles.cardTitle}>shop men</h1>
              <div className={styles.cardTitleUnderline}></div>
            </div> */}
            {/* <button className={styles.bigHeroBtn}>
              <span className={styles.bigHeroBtnText}>Explore Men</span>
            </button> */}
          </Link>
        </div>
        <div className={styles.bigHeroActionArea}>
          <div className={styles.bigHeroActionCenter}>
            <h2 className={styles.heroCardTitle}>
              Discover the<br></br>fashion
            </h2>
            <div className={styles.heroCardButtonsArea}>
              <Link href={"/women"}>
                <div className={styles.heroCardButton}>For Her</div>
              </Link>
              <div style={{ width: 15 }}></div>
              <Link href={"/men"}>
                <div className={styles.heroCardButton}>For Him</div>
              </Link>
            </div>
          </div>
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
