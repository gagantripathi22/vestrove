import React from "react";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import ProfilePage from "../../components/profile/page";

const Profile = () => {
  console.log("profile route");
  return (
    <>
      <Header />
      <ProfilePage />
      <Footer />
    </>
  );
};

export default Profile;
