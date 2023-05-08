"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/normalCategoryPage/normalcategorypage.module.scss";
import CheckBoxArea from "../items/checkboxArea/page";
import DropdownArea from "../items/dropdown/page";
import FilterIcon from "../../public/filter.svg";
import { usePathname } from "next/navigation";

const NormalCategoryPage = () => {
  const [category, setCategory] = useState("");
  const searchPathname = usePathname();
  const [itemList, setItemList] = useState([]);
  const [subCategory, setSubCategory] = useState(new Set());
  const [colorsList, setColorsList] = useState(new Set());
  const [sizeList, setSizeList] = useState(new Set());
  const [currentSubCategory, setCurrentSubCategory] = useState("all");
  const [currentColor, setCurrentColor] = useState("all");
  const [currentSize, setCurrentSize] = useState("all");
  const [currentFilters, setCurrentFilters] = useState("");

  const fetchCategoryData = async () => {
    const getCategoryData = await fetch(
      `http://localhost:8080/api/item/${category}/all` + currentFilters,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admingagan456:admingagan654"),
        },
      }
    );
    if (getCategoryData.status == 200) {
      setItemList(await getCategoryData.json());
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };

  const fetchSubCategoryData = async () => {
    setItemList([]);
    const getCategoryData = await fetch(
      `http://localhost:8080/api/item/${category}/${currentSubCategory}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admingagan456:admingagan654"),
        },
      }
    );
    if (getCategoryData.status == 200) {
      setItemList(await getCategoryData.json());
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };

  const fetchSubCategories = () => {
    console.log(itemList.length);
    const categorySet = new Set(subCategory);
    const colorSet = new Set(colorsList);
    const sizeSet = new Set(sizeList);
    itemList.forEach((item) => {
      console.log(item.color);
      categorySet.add(item.category);
      colorSet.add(item.color);
      sizeSet.add(item.size);
    });
    setSubCategory(categorySet);
    setColorsList(colorSet);
    setSizeList(sizeSet);
  };

  useEffect(() => {
    setCategory(searchPathname.substring(1));
  }, []);

  useEffect(() => {
    console.log("Cat updat : ", category);
    category !== "" && fetchCategoryData();
  }, [category]);

  useEffect(() => {
    if (currentSubCategory === "all" && itemList.length > 0)
      fetchSubCategories();
  }, [itemList]);

  useEffect(() => {
    if (currentSubCategory !== "all") fetchSubCategoryData();
    console.log(currentSubCategory);
  }, [currentSubCategory]);

  return (
    <div className={styles.normalCatContainer}>
      {category !== "" && (
        <div className={styles.sectionHeading}>{`${category}'s clothing`}</div>
      )}
      <div className={styles.sectionFilterMobile}>
        <div className={styles.filterBtn}>
          <Image alt="" className={styles.filterIcon} src={FilterIcon} />
          <div className={styles.filterText}>Filter</div>
        </div>
      </div>
      <div className={styles.normalCatSpacing}>
        <div className={styles.filterSectionSpacing}>
          <div className={styles.filterSection}>
            {/* <CheckBoxArea sectionTitle="Type" checkboxItems={subCategory} /> */}
            <DropdownArea
              sectionTitle="Product Type"
              dropboxItems={subCategory}
              subCat={setCurrentSubCategory}
            />
            <DropdownArea
              sectionTitle="Size"
              dropboxItems={sizeList}
              subCat={setCurrentColor}
            />
            <DropdownArea
              sectionTitle="Color"
              dropboxItems={colorsList}
              subCat={setCurrentSize}
            />
            {/* <CheckBoxArea sectionTitle="Size" /> */}
          </div>
        </div>
        <div className={styles.itemListSection}>
          {itemList.map((item) => {
            return (
              <div className={styles.listItem} key={item.key}>
                <Image
                  alt=""
                  className={styles.listItemImage}
                  src={
                    // "https://firebasestorage.googleapis.com/v0/b/fashion-brand-153dd.appspot.com/o/files%2Fdresses-f3.jpeg?alt=media&token=19337f2d-952b-496f-9847-407f37a21aa2"
                    item.image
                  }
                  width={200}
                  height={275}
                ></Image>
                <div className={styles.listItemDetail}>
                  <div className={styles.newArrivalItemTitle}>{item.name}</div>
                  <div className={styles.newArrivalItemPrice}>
                    Rs. {item.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NormalCategoryPage;
