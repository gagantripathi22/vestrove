'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../../styles/profile/profile.module.scss';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import RemoveBtn from '../../items/removeBtn/page';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/app/Redux/features/user/userSlice';
import LoadingSvg from '../../../public/loading-sphere.svg';

const Cart = ({ handleFetchCart }) => {
  const [item, setItems] = useState([]);
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getCart = async () => {
    const getToken = localStorage.getItem('access-token');

    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getCartUserData = await handleFetchCart(getToken, getTokenUserId);

    setItems(getCartUserData.cart);
    setIsLoading(false);
  };
  // const updateCartState = async () => {
  //   setItems(await getCart());
  // };
  const handleRemoveFromWishlist = async (itemId, itemIndex) => {
    const newItems = item.filter((item, i) => i !== itemIndex);
    setItems(newItems);

    const userEmail = await myData.email;
    const userToken = await myData.token;
    const tryLogin = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/removeFromCart`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          email: userEmail,
          itemId: itemId,
        }),
      }
    );
    if (tryLogin.status == 200) {
      dispatch(removeFromCart(itemId));
      return tryLogin.json();
    } else {
      return 'invalid credentials';
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className={styles.basicDetailSection}>
      <h3 className={styles.sectionTitle}>Cart</h3>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Image src={LoadingSvg} height={100}></Image>
        </div>
      ) : (
        <div className={styles.sectionItemsGrid}>
          {item?.map((data, index) => {
            return (
              <div
                style={{ position: 'relative' }}
                className={styles.gridItemMainContainer}
                key={item.id}
              >
                <div
                  className={styles.removeBtn}
                  onClick={() => handleRemoveFromWishlist(data._id, index)}
                >
                  <RemoveBtn />
                </div>
                <Link href={`/product/${data._id}`}>
                  <div className={styles.sectionGridItem}>
                    <Image
                      className={styles.sectionGridItemImage}
                      src={data.image}
                      height={180}
                      width={180}
                    ></Image>
                    <div className={styles.sectoinGridItemDetail}>
                      <div className={styles.sectionGridItemName}>
                        {data.name}
                      </div>
                      <div className={styles.sectionGridItemPrice}>
                        Rs. {data.price}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
