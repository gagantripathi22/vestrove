"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../../styles/home/newArrivalSlider/newarrivalslider.module.css";
import Link from "next/link";

const NewArrivalSlider = () => {
  const SliderItemComponent = ({ item, index }) => {
    return (
      <>
        <div
          onClick={() => {
            index !== 0 && index !== 4 && shiftItem(item, index);
          }}
          className={styles.sliderItem}
        >
          <Image src={item.image} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.sliderItemDetailArea}>
          <div className={styles.sliderItemName}>{item.name}</div>
          <div className={styles.sliderItemName}>Rs. {item.price}</div>
        </div>
      </>
    );
  };
  const [list, setList] = useState([]);
  async function fetchNewArrivals() {
    console.log("newarrivals Function");
    const tryFetchProduct = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/item/recentFive`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`
            ),
        },
      }
    );
    if (tryFetchProduct.status === 200) {
      setList(await tryFetchProduct.json());
    } else {
      console.log("errorrrrr");
    }
  }
  useEffect(() => {
    fetchNewArrivals();
  }, []);
  const shiftItem = (item, index) => {
    if (index > 2) {
      for (let itr = 0; itr < index - 2; itr++) {
        const firstItem = list.shift();
        setList((prevState) => [...prevState, firstItem]);
      }
    } else {
      for (let itr = 0; itr < 2 - index; itr++) {
        const lastItem = list.pop();
        setList((prevState) => [lastItem, ...prevState]);
      }
    }
  };
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <>
      <div className={styles.slider}>
        {list.map((item, index) => {
          return (
            <div className={styles.sliderItemArea} key={item._id}>
              {list[index]._id === list[2]._id ? (
                <Link href={`/product/${item._id}`} key={item._id}>
                  <SliderItemComponent item={item} index={index} />
                </Link>
              ) : (
                <SliderItemComponent item={item} index={index} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewArrivalSlider;
