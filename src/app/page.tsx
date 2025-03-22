import React from "react";
import Orders from "@/components/Home/Orders";
import ShopFooter from "@/components/Home/ShopFooter";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import { addDocument, getDocuments } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
export default async function Shop() {
  const products: any = await getDocuments("products");
  await addDocument("page-views", uuidv4(), {
    page: "shop",
    date: Date.now(),
  });
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <Hero />
      <ClientFormWrapper />
      {products?.length > 0 && <Products products={products} />}
      <Orders />
      <ShopFooter />
    </div>
  );
}
