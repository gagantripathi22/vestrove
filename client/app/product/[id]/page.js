// "use server";

import React from "react";
import ProductPage from "../../../components/product/page";

export const metadata = {
  title: "Sevnstop",
};

async function handleProductFetch(productId) {
  "use server";
  const tryFetchProduct = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item/product/${productId}`,
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
  if (tryFetchProduct.status === 200) {
    return tryFetchProduct.json();
  }
}

const Product = () => {
  return (
    <>
      <ProductPage handleProductFetch={handleProductFetch} />
    </>
  );
};

export default Product;
