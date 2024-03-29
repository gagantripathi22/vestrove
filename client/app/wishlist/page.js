import React from 'react';
import WishlistPage from '../profile/page';

async function handleFetchWishlist(token, userId) {
  'use server';
  const getWishlistUserData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/getWishlist`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
      }),
      cache: 'no-store',
    }
  );
  if (getWishlistUserData.status === 200) {
    return getWishlistUserData.json();
  }
}

const Wishlist = () => {
  return (
    <>
      <WishlistPage handleFetchWishlist={handleFetchWishlist} />
    </>
  );
};

export default Wishlist;
