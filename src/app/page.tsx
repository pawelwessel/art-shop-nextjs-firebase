import React from "react";
import Orders from "@/components/Home/Orders";
import ShopFooter from "@/components/Home/ShopFooter";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import dynamic from "next/dynamic";
// const Products = dynamic(() => import("@/components/Home/Products"));
export default async function Shop() {
  // const products: any = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`
  // ).then((res) => res.json());
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <Hero />
      {/* {products?.length > 0 && <Products products={products} />} */}
      <Orders />
      <ShopFooter />
    </div>
  );
}
