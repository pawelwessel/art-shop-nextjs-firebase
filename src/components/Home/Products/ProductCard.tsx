import Image from "next/image";
import { getPolishCurrency } from "../../../../utils/getPolishCurrency";
import { updateDocument } from "@/firebase";
import { useState } from "react";

export default function ProductCard({
  setOpenedImage,
  product,
}: {
  setOpenedImage: any;
  product: any;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className=" group relative cursor-pointer p-3"
      onClick={() => {
        setOpenedImage(product.id);
        updateDocument(
          ["views"],
          [product?.views ? product?.views + 1 : 1],
          "products",
          product.id
        );
      }}
    >
      {!loading && (
        <div className=" absolute z-[6] inset-0 flex items-center justify-center">
          <div className="text-center">
            {product.price > 0 && (
              <p className="group-hover:scale-110 scale-125 duration-700 font-cardo text-white font-bold text-sm mb-1">
                {getPolishCurrency(product.price)}
              </p>
            )}
            {product.price === 0 && (
              <p className="text-white font-bold text-sm mb-1">
                Zapytaj o cenę
              </p>
            )}
            {product?.sold && (
              <p className="text-red-500 font-bold text-sm mb-1">Sprzedany</p>
            )}
            <h2 className="font-cardo text-white font-bold text-lg line-clamp-2">
              {product.title}
            </h2>
          </div>
        </div>
      )}

      <div className="">
        {loading && (
          <div className="w-full h-[500px] bg-gray-200 animate-pulse">
            <Image
              width={800}
              height={800}
              src={product.mainImage || product.images[0].src}
              alt={product.title}
              onLoad={() => setLoading(false)}
              className={`${
                !loading ? "opacity-100" : "opacity-0"
              }  shadow-sm shadow-black rounded-xl w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3`}
            />
          </div>
        )}
        {!loading && (
          <Image
            width={800}
            height={800}
            src={product.mainImage || product.images[0].src}
            alt={product.title}
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
              }, 3000);
            }}
            className={`${
              !loading ? "opacity-100" : "opacity-0"
            } shadow-lg shadow-zinc-500 rounded-xl  w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3`}
          />
        )}
      </div>
    </div>
  );
}
