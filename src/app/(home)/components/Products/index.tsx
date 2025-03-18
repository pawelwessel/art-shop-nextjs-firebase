"use client";
import { ArtworkData } from "@/types";
import Product from "./Product";
import { useState } from "react";

export default function Products({ products }: { products: ArtworkData[] }) {
  const [openedImage, setOpenedImage] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filterProducts = () => {
    let filteredProducts = products;

    if (filter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filter
      );
    }

    if (priceFilter === "low-to-high") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high-to-low") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts();

  return (
    <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
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
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any, i) => (
            <Product
              product={product}
              key={i}
              products={[...products]
                .sort(() => 0.5 - Math.random())
                .slice(0, 10)}
              openedImage={openedImage}
              setOpenedImage={setOpenedImage}
            />
          ))
        ) : (
          <div className="p-4 bg-gray-200"> Brak wyników... </div>
        )}
      </div>
    </div>
  );
}
