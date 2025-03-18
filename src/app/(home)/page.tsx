import React from "react";
import Products from "./components/Products";
import Orders from "./components/Orders";
import ShopFooter from "./components/ShopFooter";
import PrepareCart from "./components/PrepareCart";
import Hero from "./components/Hero";
import { getDocuments } from "@/firebase";

export default async function Shop() {
  const products: any = await getDocuments("products");
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <Hero />
      <Products products={products} />
      <div className="mt-12">
        <Orders />
      </div>
      <ShopFooter />
    </div>
  );
}
