import React from 'react';
import CartPage from '../profile/page';

async function handleFetchCart(token, userId) {
  'use server';
  const getCartUserData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/getCart`,
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
  if (getCartUserData.status === 200) {
    return getCartUserData.json();
  }
}

const Cart = () => {
  return <CartPage handleFetchCart={handleFetchCart} />;
};

export default Cart;
