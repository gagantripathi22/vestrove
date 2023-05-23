import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/listItem/listitem.module.scss";

const ListItem = ({ item, itemWidth }) => {
  return (
    <Link href={`/product/${item._id}`} key={item.id}>
      <div className={styles.listItem} style={{ width: itemWidth }}>
        <Image
          className={styles.listItemImage}
          src={item.image}
          height={330}
          width={200}
        ></Image>
        <div className={styles.listItemDetail}>
          <div className={styles.newArrivalItemTitle}>{item.name}</div>
          <div className={styles.newArrivalItemPrice}>Rs. {item.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
