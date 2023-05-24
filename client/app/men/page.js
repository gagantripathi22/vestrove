import React from "react";
import CategoryPage from "../../components/normalCategoryPage/page";

export const metadata = {
  title: "Men's Clothing",
};

async function handleProductsFetch(category, subcat, color, size) {
  "use server";
  console.log("Handle Product Fetch Called");
  const getProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item/${category}/all?` +
      subcat +
      color +
      size,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`
          ),
      },
    }
  );
  if (getProducts.status === 200) {
    return getProducts.json();
  }
}

const Men = () => {
  console.log("menroute");
  return (
    <>
      <CategoryPage handleProductsFetch={handleProductsFetch} />
    </>
  );
};

export default Men;
