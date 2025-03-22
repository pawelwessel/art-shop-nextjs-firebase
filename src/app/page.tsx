import React from "react";
import Orders from "@/components/Home/Orders";
import ShopFooter from "@/components/Home/ShopFooter";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
export default async function Page() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await req.json();

  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <Hero />
      <ClientFormWrapper />
      <Products products={products} />
      <Orders />
      <ShopFooter />
    </div>
  );
}
