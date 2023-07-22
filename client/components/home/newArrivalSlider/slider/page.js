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
            shiftItem(item, index);
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
  let newArrivalList = [];
  const [list, setList] = useState([]);
  async function fetchNewArrivals() {
    console.log("newarrivals Function");
    const tryFetchProduct = await fetch(
      `http://localhost:8080/api/item/recentFive`,
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
  return (
    <>
      <div className={styles.slider}>
        {list.map((item, index) => {
          return (
            <div
              className={styles.sliderItemArea}
              onClick={() => {
                console.log(list[index].id, " + ", list[2].id);
              }}
            >
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
