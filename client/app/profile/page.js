import React from "react";
import ProfilePage from "../../components/profile/page";

async function handleProfileUpdate(uid, token, firstname, lastname, email) {
  "use server";
  console.log("handle Profile update working");
  const tryProfileUpdate = await fetch(
    `https://seven-stop-backend.onrender.com/api/user/updateProfile/${uid}`,
    // `https://seven-stop-backend.onrender.com/api/user/updateProfile/6463be8e16f99a32aa321f7d`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
      }),
    }
  );
  if (tryProfileUpdate) {
    console.log("successfully updated profile");
  } else [console.log("failed profile updation")];
}

async function handlePasswordUpdate(uid, token, currentPassword, newPassword) {
  "use server";
  console.log("handle password update working");
  const tryProfileUpdate = await fetch(
    `https://seven-stop-backend.onrender.com/api/user/updatePassword/${uid}`,
    // `https://seven-stop-backend.onrender.com/api/user/updateProfile/6463be8e16f99a32aa321f7d`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    }
  );
  if (tryProfileUpdate) {
    console.log("successfully updated profile");
  } else [console.log("failed profile updation")];
}

const Profile = ({ wishList, cartList }) => {
  console.log("profile route");
  return (
    <>
      <ProfilePage
        handleProfileUpdate={handleProfileUpdate}
        handlePasswordUpdate={handlePasswordUpdate}
      />
    </>
  );
};

export default Profile;
