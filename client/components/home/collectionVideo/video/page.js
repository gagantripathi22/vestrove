'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../../../styles/home/collectionVideo/collectionVideo.module.css';
import Link from 'next/link';

const Video = () => {
  return (
    <>
      <div className={styles.video}>
        <Link href={`/women`}>
          <div className={styles.videoItem}>
            <h2 className={styles.videoHeading}>Summer collection</h2>
            <h3 className={`${styles.videoHeading} ${styles.videoSubHeading}`}>
              Explore
            </h3>
            <video
              className={styles.videoClip}
              src={'/video.mp4'}
              muted
              autoPlay
              loop
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Video;
