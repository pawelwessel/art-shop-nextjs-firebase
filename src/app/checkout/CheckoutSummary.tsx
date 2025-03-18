"use client";
/* eslint-disable @next/next/no-img-element */
import { ArtworkData } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { getPolishCurrency } from "../../../utils/getPolishCurrency";

export default function CheckoutSummary({ cart }: { cart: any }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (cart?.length) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [cart?.length]);
  const cartPrice = cart?.reduce((acc: any, item: any) => {
    return acc + item.price;
  }, 0);

  return (
    <div className="flex flex-col  justify-center w-full h-full">
      {isLoading ? (
        <div className="bg-gray-500 text-black w-24 h-24 mx-auto rounded-md flex flex-col items-center justify-center">
          <img
            className="h-12 w-12"
            src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/blocks-shuffle-2.svg"
            alt=""
          />
          <h2 className="text-sm font-bold mt-3">Blackbell Art</h2>
        </div>
      ) : (
        <>
          {!cart?.length && (
            <>
              <FaShoppingCart className="text-7xl text-black mt-12" />
              <p className="text-black mt-5 text-center">
                Twój koszyk jest pusty...
              </p>
            </>
          )}
          {cart?.length && (
            <>
              <Link
                href="/"
                className="text-black font-bold text-xl flex flex-row items-center mb-12 px-6 sm:px-36 lg:px-24"
              >
                <FaArrowLeft className="mr-2" />
                Powrót
              </Link>
              <h2 className="mb-3 px-6 sm:px-36 lg:px-24 text-base text-black">
                Do zapłaty
              </h2>
              <span className="text-[30px] xl:text-[38px]  font-bold text-black px-6 sm:px-36 lg:px-24">
                {cartPrice > 250
                  ? getPolishCurrency(cartPrice)
                  : getPolishCurrency(cartPrice + 20)}
              </span>
              <div className="grid grid-cols-1 mt-16 text-black w-full px-6 sm:px-36 lg:px-24">
                {cart?.map((item: ArtworkData, i: any) => (
                  <div key={i}>
                    <div className="flex flex-row items-start justify-between w-full">
                      <div className="flex flex-row w-full items-start justify-start h-full">
                        <div className="aspect-square h-[85px] w-[85px] rounded-lg overflow-hidden">
                          <img
                            src={item?.mainImage}
                            alt=""
                            className="w-full h-full object-cover my-auto"
                          />
                        </div>
                        <div className="pl-2 w-2/3">
                          <p className="font-bold">{item.title}</p>
                          <p className="text-black text-sm">
                            {item.dimensions}
                          </p>
                        </div>
                      </div>
                      <div className="font-bold text-lg w-max">
                        <div className="w-max">
                          {getPolishCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#e5e7eb] h-px my-4 opacity-10" />
                  </div>
                ))}
              </div>
              <div className="px-6 sm:px-36 lg:px-24 text-black">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-lg font-bold">Wysyłka</p>
                  <p className="text-lg font-bold">
                    {cartPrice > 250 && "Darmowa"}
                    {cartPrice < 250 && getPolishCurrency(20)}
                  </p>
                </div>
                <div className="bg-[#e5e7eb] h-px my-4 opacity-10" />
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-lg font-bold">Do zapłaty</p>
                  <p className="text-lg font-bold">
                    {getPolishCurrency(
                      cartPrice < 250 ? cartPrice + 20 : cartPrice
                    )}
                  </p>
                </div>
                <div className="bg-[#e5e7eb] h-px my-4 opacity-10" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
