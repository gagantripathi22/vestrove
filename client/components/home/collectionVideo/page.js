"use client";
import React from "react";
import styles from "../../../styles/home/collectionVideo/collectionVideo.module.css";
import Video from "./video/page";

const CollectionVideo = () => {
  return (
    <div className={styles.collectionVideoContainer}>
      <div className={styles.collectionVideoSpacing}>
        <Video />
      </div>
    </div>
  );
};

export default CollectionVideo;
