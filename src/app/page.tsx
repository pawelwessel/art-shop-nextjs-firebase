import React from "react";
import Orders from "@/components/Home/Orders";
import ShopFooter from "@/components/Home/ShopFooter";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import { addDocument } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
export default async function Page() {
  await addDocument("page-views", uuidv4(), { date: Date.now(), page: "shop" });
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <Hero />
      <ClientFormWrapper />
      <Products />
      <Orders />
      <ShopFooter />
    </div>
  );
}
