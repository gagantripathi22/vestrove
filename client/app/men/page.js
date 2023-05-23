import React from "react";
import CategoryPage from "../../components/normalCategoryPage/page";

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
