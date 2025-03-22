import React from "react";
import Orders from "@/components/Home/Orders";
import ShopFooter from "@/components/Home/ShopFooter";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import { addDocument } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
export default async function Shop() {
  const products: any = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
    {
      cache: "no-store",
      next: {
        revalidate: 30,
      },
    }
  ).then((res) => res.json());
  const visitorData = await fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => ({
      page: "shop",
      date: Date.now(),
      ip: data.ip,
    }));
  await addDocument("page-views", uuidv4(), visitorData);
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
