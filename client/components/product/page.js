"use client";
import React, { use, useEffect, useState } from "react";
import styles from "../../styles/product/product.module.css";
import Image from "next/image";
import Dropdown from "../items/dropdown/page";
import Button from "../items/button/page";
import { usePathname, useSearchParams } from "next/navigation";
import Head from "next/head";
import WishlistIcon from "../../public/wishlist.svg";
import WishlistIconRed from "../../public/wishlist-red.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
} from "@/app/Redux/features/user/userSlice";
import InitializeData from "@/app/Redux/features/initialize/initialize";

const Product = () => {
  const dispatch = useDispatch();
  const userSelector = (state) => state.user;
  const userData = useSelector(userSelector);
  const productId = usePathname().split("/")[2];
  const [productData, setProductData] = useState([]);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const getProduct = async () => {
    const tryFetchProduct = await fetch(
      `https://seven-stop-backend.onrender.com/api/item/product/${productId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admingagan456:admingagan654"),
        },
      }
    );
    if (tryFetchProduct.status == 200) {
      console.log("success");
      setProductData(await tryFetchProduct.json());
    } else {
      console.log("fail");
      return "invalid credentials";
    }
  };
  const handleAddToWishlist = async () => {
    const tryAddToWishlist = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/addToWishlist`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryAddToWishlist.status == 200) {
      console.log("successfully added to wishlist");
      dispatch(addToWishlist(productId));
      setIsProductInWishlist((prev) => !prev);
    } else {
      console.log("fail to add to wishlist");
      return "invalid credentials";
    }
  };
  const handleRemoveFromWishlist = async () => {
    const tryRemoveFromWishlist = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/removeFromWishlist`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryRemoveFromWishlist.status == 200) {
      console.log("successfully removed from wishlist");
      dispatch(removeFromWishlist(productId));
      setIsProductInWishlist((prev) => !prev);
    } else {
      console.log("fail to remove from wishlist");
      return "invalid credentials";
    }
  };
  const handleAddToCart = async () => {
    const tryAddToCart = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/addToCart`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryAddToCart.status == 200) {
      console.log("successfully added to cart");
      dispatch(addToCart(productId));
      setIsProductInCart((prev) => !prev);
    } else {
      console.log("fail to add to cart");
      return "invalid credentials";
    }
  };
  const handleRemoveFromCart = async () => {
    const tryRemoveFromCart = await fetch(
      `https://seven-stop-backend.onrender.com/api/user/removeFromCart`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryRemoveFromCart.status == 200) {
      console.log("successfully remove from cart");
      dispatch(removeFromCart(productId));
      setIsProductInCart((prev) => !prev);
    } else {
      console.log("fail to remove from cart");
      return "invalid credentials";
    }
  };
  const getProductDetailsFromRedux = async () => {
    userData.wishlist.forEach((storeItem) => {
      if (storeItem === productId) setIsProductInWishlist(true);
    });
    userData.cart.forEach((storeItem) => {
      if (storeItem === productId) setIsProductInCart(true);
    });
  };
  useEffect(() => {
    getProduct();
    getProductDetailsFromRedux();
    console.log("User Data from redux : ", userData);
  }, []);

  return (
    <>
      <InitializeData />
      <div className={styles.productContainer}>
        <div className={styles.productSpacing}>
          <div className={styles.product}>
            <div className={styles.productImageContainer}>
              <Image
                src={productData[0]?.image}
                className={styles.productImage}
                width={650}
                height={900}
                priority
              ></Image>
              <div
                className={styles.wishlistBtn}
                onClick={() =>
                  isProductInWishlist
                    ? handleRemoveFromWishlist()
                    : handleAddToWishlist()
                }
              >
                <Image
                  src={isProductInWishlist ? WishlistIconRed : WishlistIcon}
                  height={24}
                ></Image>
              </div>
            </div>
            <div className={styles.productDetailContainer}>
              <h1 className={styles.productName}>{productData[0]?.name}</h1>
              <div className={styles.productPrice}>
                Rs. {productData[0]?.price}
              </div>
              <div className={styles.productColor}>{productData[0]?.color}</div>
              <div className={styles.dropdown}>
                <Dropdown
                  defaultOptionTitle={"size"}
                  dropboxItems={[{ name: productData[0]?.size }]}
                />
              </div>
              <div
                style={{ width: "100%", marginTop: -35 }}
                onClick={() =>
                  isProductInCart ? handleRemoveFromCart() : handleAddToCart()
                }
              >
                <Button
                  text={isProductInCart ? "Remove from Cart" : "Add To Cart"}
                  buttonHeight={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
