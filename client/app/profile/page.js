import React from "react";
import ProfilePage from "../../components/profile/page";

async function handleProfileUpdate(uid, token, firstname, lastname, email) {
  "use server";
  const tryProfileUpdate = await fetch(
    `http://localhost:8080/api/user/updateProfile/${uid}`,
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

async function handlePasswordUpdate(currentPassword, newPassword) {
  "use server";
  const tryProfileUpdate = await fetch(
    `http://localhost:8080/api/user/updatePassword/${uid}`,
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
      <ProfilePage />
    </>
  );
};

export default Profile;
