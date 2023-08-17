'use client';
import React, { use, useEffect, useState } from 'react';
import styles from '../../styles/product/product.module.css';
import Image from 'next/image';
import Dropdown from '../items/dropdown/page';
import Button from '../items/button/page';
import { usePathname, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import WishlistIcon from '../../public/wishlist.svg';
import WishlistIconRed from '../../public/wishlist-red.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
} from '@/app/Redux/features/user/userSlice';
import InitializeData from '@/app/Redux/features/initialize/initialize';
import LoadingSvg from '../../public/loading-sphere.svg';

const Product = ({ handleProductFetch }) => {
  const dispatch = useDispatch();
  const userSelector = (state) => state.user;
  const userData = useSelector(userSelector);
  const productId = usePathname().split('/')[2];
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [productData, setProductData] = useState([
    {
      name: '',
      color: '',
      size: '',
      price: '',
      image: '',
    },
  ]);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const getProduct = async () => {
    const tryFetchProduct = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/item/product/${productId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            btoa(
              `${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`
            ),
        },
      }
    );
    if (tryFetchProduct.status == 200) {
      setProductData(await tryFetchProduct.json());
    } else {
      return 'invalid credentials';
    }
    // const productData = await handleProductFetch(productId);
    // setProductData(productData);
  };
  const handleAddToWishlist = async () => {
    setIsLoadingBtn(true);
    const tryAddToWishlist = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/addToWishlist`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryAddToWishlist.status == 200) {
      setIsLoadingBtn(false);
      dispatch(addToWishlist(productId));
      setIsProductInWishlist((prev) => !prev);
    } else {
      setIsLoadingBtn(false);
      return 'invalid credentials';
    }
  };
  const handleRemoveFromWishlist = async () => {
    setIsLoadingBtn(true);
    const tryRemoveFromWishlist = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/removeFromWishlist`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryRemoveFromWishlist.status == 200) {
      setIsLoadingBtn(false);
      dispatch(removeFromWishlist(productId));
      setIsProductInWishlist((prev) => !prev);
    } else {
      setIsLoadingBtn(false);
      return 'invalid credentials';
    }
  };
  const handleAddToCart = async () => {
    setIsLoadingBtn(true);
    const tryAddToCart = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/addToCart`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryAddToCart.status == 200) {
      setIsLoadingBtn(false);
      dispatch(addToCart(productId));
      setIsProductInCart((prev) => !prev);
    } else {
      setIsLoadingBtn(false);
      return 'invalid credentials';
    }
  };
  const handleRemoveFromCart = async () => {
    setIsLoadingBtn(true);
    const tryRemoveFromCart = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/removeFromCart`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          itemId: productId,
        }),
      }
    );
    if (tryRemoveFromCart.status == 200) {
      setIsLoadingBtn(false);
      dispatch(removeFromCart(productId));
      setIsProductInCart((prev) => !prev);
    } else {
      setIsLoadingBtn(false);
      return 'invalid credentials';
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
  }, []);

  return (
    <>
      <InitializeData />
      <div className={styles.productContainer}>
        <div className={styles.productSpacing}>
          <div className={styles.product}>
            <div className={styles.productImageContainer}>
              {productData[0]?.image !== '' ? (
                <>
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
                </>
              ) : (
                <div className={styles.loadingContainer}>
                  <Image src={LoadingSvg} height={100}></Image>
                </div>
              )}
            </div>
            <div className={styles.productDetailContainer}>
              {productData[0]?.name !== '' ? (
                <h1 className={styles.productName}>{productData[0]?.name}</h1>
              ) : (
                <div
                  className={styles.loadingSkeleton}
                  style={{ width: 250 }}
                ></div>
              )}
              {productData[0]?.price !== '' ? (
                <div className={styles.productPrice}>
                  Rs. {productData[0]?.price}
                </div>
              ) : (
                <div
                  className={styles.loadingSkeleton}
                  style={{ width: 150, marginTop: 24 }}
                ></div>
              )}
              {productData[0]?.color !== '' ? (
                <div className={styles.productColor}>
                  {productData[0]?.color}
                </div>
              ) : (
                <div
                  className={styles.loadingSkeleton}
                  style={{ width: 60, marginTop: 24 }}
                ></div>
              )}
              <div className={styles.dropdown}>
                {productData[0]?.size !== '' ? (
                  <Dropdown
                    defaultOptionTitle={'size'}
                    dropboxItems={[{ name: productData[0]?.size }]}
                  />
                ) : (
                  <div
                    className={styles.loadingSkeleton}
                    style={{ width: 300, marginTop: 24, marginBottom: 70 }}
                  ></div>
                )}
              </div>
              <div
                style={{ width: '100%', marginTop: 0 }}
                onClick={() =>
                  isProductInCart ? handleRemoveFromCart() : handleAddToCart()
                }
              >
                <Button
                  text={isProductInCart ? 'Remove from Cart' : 'Add To Cart'}
                  buttonHeight={50}
                  buttonWidth={230}
                  loading={isLoadingBtn}
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
