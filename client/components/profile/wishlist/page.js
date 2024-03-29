'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../../styles/profile/profile.module.scss';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';
import RemoveBtn from '../../items/removeBtn/page';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@/app/Redux/features/user/userSlice';
import InitializeData from '../../../app/Redux/features/initialize/initialize';
import LoadingSvg from '../../../public/loading-sphere.svg';

const Wishlist = ({ handleFetchWishlist }) => {
  const [item, setItems] = useState([]);
  const mySelector = (state) => state.user;
  const myData = useSelector(mySelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getWishlist = async () => {
    const getToken = localStorage.getItem('access-token');
    const getTokenData = await jwt_decode(getToken);
    const getTokenUserId = getTokenData.fetchedUserTokenData._id;
    const getWishlistUserData = await handleFetchWishlist(
      getToken,
      getTokenUserId
    );

    setItems(getWishlistUserData.wishlist);
    setIsLoading(false);
  };

  const handleRemoveFromWishlist = async (itemId, itemIndex) => {
    const newItems = item.filter((item, i) => i !== itemIndex);
    setItems(newItems);

    const userEmail = await myData.email;
    const userToken = await myData.token;
    const tryLogin = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/removeFromWishlist`,
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
      dispatch(removeFromWishlist(itemId));

      return tryLogin.json();
    } else {
      return 'invalid credentials';
    }
  };
  useEffect(() => {}, [item]);
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <>
      <InitializeData />
      <div className={styles.basicDetailSection}>
        <h3 className={styles.sectionTitle}>Wishlist</h3>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Image src={LoadingSvg} height={100}></Image>
          </div>
        ) : (
          <div className={styles.sectionItemsGrid}>
            {item?.map((data, index) => {
              return (
                <div style={{ position: 'relative' }} key={item.id}>
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
    </>
  );
};

export default Wishlist;
