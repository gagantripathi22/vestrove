import React from "react";
import CategoryPage from "../../components/normalCategoryPage/page";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";

export const metadata = {
  title: "Men's Clothing",
};

const Men = () => {
  console.log("menroute");
  return (
    <>
      <CategoryPage />
    </>
  );
};

export default Men;
