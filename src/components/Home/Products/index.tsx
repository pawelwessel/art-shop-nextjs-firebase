"use client";
import Product from "./Product";
import { useState } from "react";
import dynamic from "next/dynamic";
import Checkout from "@/components/Checkout";
const Masonry = dynamic(() => import("react-responsive-masonry"), {
  ssr: false,
});
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);
export default function Products({ products }: { products: any }) {
  const [openedImage, setOpenedImage] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filterProducts = () => {
    let filteredProducts = [...products];
    if (filter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.category === filter
      );
    }
    if (priceFilter === "low-to-high") {
      filteredProducts = filteredProducts.sort(
        (a: any, b: any) => a.price - b.price
      );
    } else if (priceFilter === "high-to-low") {
      filteredProducts = filteredProducts.sort(
        (a: any, b: any) => b.price - a.price
      );
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts();
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
      {isCheckout && (
        <Checkout setIsCheckout={setIsCheckout} isCheckout={isCheckout} />
      )}
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 w-max max-w-full leading-tight">
        Witaj w moim sklepie
      </h2>
      <p className="mt-2 text-gray-700">
        Zamów oryginalne obrazy na płótnie, naklejki lub druki
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-4">
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filtruj produkty
          </label>
          <select
            id="filter"
            name="filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="paintings">Obrazy</option>
            <option value="stickers">Naklejki</option>
            <option value="prints">Druki</option>
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="price-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Filtruj według ceny
          </label>
          <select
            id="price-filter"
            name="price-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="low-to-high">Od najniższej do najwyższej</option>
            <option value="high-to-low">Od najwyższej do najniższej</option>
          </select>
        </div>
      </div>
      {/* implement masonry grid instead of grid */}
      <ResponsiveMasonry
        className="mt-4"
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1360: 4 }}
      >
        <Masonry>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any, i) => (
              <Product
                product={product}
                key={i}
                products={products}
                openedImage={openedImage}
                setOpenedImage={setOpenedImage}
                setIsCheckout={setIsCheckout}
              />
            ))
          ) : (
            <div className="p-4 bg-gray-200">Brak wyników... </div>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
