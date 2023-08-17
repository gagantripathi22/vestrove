import React from 'react';
import ProfilePage from '../../components/profile/page';

async function handleProfileUpdate(uid, token, firstname, lastname, email) {
  'use server';
  const tryProfileUpdate = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/updateProfile/${uid}`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
      }),
    }
  );
}

async function handlePasswordUpdate(uid, token, currentPassword, newPassword) {
  'use server';
  const tryProfileUpdate = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/updatePassword/${uid}`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    }
  );
}

const Profile = ({
  wishList,
  cartList,
  handleFetchWishlist,
  handleFetchCart,
}) => {
  return (
    <>
      <ProfilePage
        handleProfileUpdate={handleProfileUpdate}
        handlePasswordUpdate={handlePasswordUpdate}
        handleFetchWishlist={handleFetchWishlist}
        handleFetchCart={handleFetchCart}
      />
    </>
  );
};

export default Profile;
