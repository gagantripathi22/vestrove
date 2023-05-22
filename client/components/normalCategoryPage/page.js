"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/normalCategoryPage/normalcategorypage.module.scss";
import CheckBoxArea from "../items/checkboxArea/page";
import Link from "next/link";
import DropdownArea from "../items/dropdown/page";
import FilterIcon from "../../public/filter.svg";
import { usePathname, useSearchParams } from "next/navigation";
import FiltersListJson from "./filters.json";
import InitializeData from "@/app/Redux/features/initialize/initialize";

const NormalCategoryPage = () => {
  const urlquery = useSearchParams();
  const searchPathname = usePathname();
  const [category, setCategory] = useState(searchPathname.substring(1));
  const [itemList, setItemList] = useState([]);
  const [subCategory, setSubCategory] = useState(new Set());
  const [colorsList, setColorsList] = useState(new Set());
  const [sizeList, setSizeList] = useState(new Set());
  const [currentSubCategory, setCurrentSubCategory] = useState(
    urlquery.get("type") ? urlquery.get("type") : ""
  );
  const [currentColor, setCurrentColor] = useState("");
  const [currentSize, setCurrentSize] = useState("");

  const fetchCategoryData = async () => {
    console.log(
      "Fetch Category Data Called : Category = ",
      category,
      " Filter = ",
      currentSubCategory,
      currentColor,
      currentSize
    );
    setItemList([]);
    console.log("subcat", typeof currentSubCategory, currentSubCategory);
    console.log("color", typeof currentColor, currentColor);
    console.log("size", typeof currentSize, currentSize);
    const subcat =
      currentSubCategory !== "" ? "type=" + currentSubCategory + "&" : "";
    const color = currentColor !== "" ? "color=" + currentColor + "&" : "";
    const size = currentSize !== "" ? "size=" + currentSize + "&" : "";

    const getCategoryData = await fetch(
      `http://localhost:8080/api/item/${category}/all?` + subcat + color + size,
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

  useEffect(() => {
    console.log(currentSubCategory, currentColor, currentSize);

    fetchCategoryData();
  }, [currentSubCategory, currentColor, currentSize]);

  useEffect(() => {
    setCurrentSubCategory(urlquery.get("type"));
    setCurrentColor(urlquery.get("color"));
    setCurrentSize(urlquery.get("size"));
  }, []);

  useEffect(() => {
    setCurrentSubCategory(urlquery.get("type"));
    setCurrentColor(urlquery.get("color"));
    setCurrentSize(urlquery.get("size"));
  }, [urlquery.get("type"), urlquery.get("color"), urlquery.get("size")]);

  const fetchFilterLists = () => {
    const categorySet = new Set(subCategory);
    const colorSet = new Set(colorsList);
    const sizeSet = new Set(sizeList);
    itemList.forEach((item) => {
      categorySet.add(item.category);
      colorSet.add(item.color);
      sizeSet.add(item.size);
    });
    setSubCategory(categorySet);
    setColorsList(colorSet);
    setSizeList(sizeSet);
  };

  useEffect(() => {
    if (itemList.length > 0) fetchFilterLists();
  }, [itemList]);

  return (
    <>
      <InitializeData />
      <div className={styles.normalCatContainer}>
        <div className={styles.sectionHeadingAndFilter}>
          {category !== "" && (
            <div
              className={styles.sectionHeading}
            >{`${category}'s clothing`}</div>
          )}
          <div className={styles.sectionFilterMobile}>
            <div className={styles.filterBtn}>
              <Image alt="" className={styles.filterIcon} src={FilterIcon} />
              <div className={styles.filterText}>Filter</div>
            </div>
          </div>
        </div>
        <div className={styles.normalCatSpacing}>
          <div className={styles.filterSectionSpacing}>
            <div className={styles.filterSection}>
              {/* <CheckBoxArea sectionTitle="Type" checkboxItems={subCategory} /> */}
              <DropdownArea
                sectionTitle="Product Type"
                defaultOptionTitle="Product Type"
                dropboxItems={
                  category === "women" ? FiltersListJson[2] : FiltersListJson[3]
                }
                subCat={setCurrentSubCategory}
                initialValue={currentSubCategory}
              />
              <DropdownArea
                sectionTitle="Size"
                defaultOptionTitle="Size"
                dropboxItems={FiltersListJson[0]}
                subCat={setCurrentSize}
                initialValue={currentSize}
              />
              <DropdownArea
                sectionTitle="Color"
                defaultOptionTitle="Color"
                dropboxItems={FiltersListJson[1]}
                subCat={setCurrentColor}
                initialValue={currentColor}
              />
            </div>
          </div>
          <div className={styles.itemDetailSection}>
            <div className={styles.itemListSection}>
              {itemList.map((item) => {
                return (
                  <Link href={`/product/${item._id}`}>
                    <div className={styles.listItem} key={item.id}>
                      <Image
                        alt=""
                        className={styles.listItemImage}
                        src={item.image}
                        width={200}
                        height={275}
                      ></Image>
                      <div className={styles.listItemDetail}>
                        <div className={styles.newArrivalItemTitle}>
                          {item.name}
                        </div>
                        <div className={styles.newArrivalItemPrice}>
                          Rs. {item.price}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalCategoryPage;
