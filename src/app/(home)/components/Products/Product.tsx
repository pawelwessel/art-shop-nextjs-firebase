"use client";
import { ArtworkData } from "@/types";

import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { getPolishCurrency } from "../../../../../utils/getPolishCurrency";
import Viewer from "@/components/Viewer";
import { removeFromCart, setCart } from "@/redux/slices/shopSlice";

import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect } from "react";
import ProductImages from "../ProductImages";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import ProjectImages from "../ProjectImages";
export default function Product({
  product,
  products,
  openedImage,
  setOpenedImage,
}: {
  product: ArtworkData;
  products: any[];
  openedImage: any;
  setOpenedImage: any;
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.shop.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const handleAddToCart = () => {
    localStorage.setItem("cart", JSON.stringify(product));
    dispatch(setCart(product));
    setCartOpen(true);
  };
  return (
    <>
      {isCartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="h-screen w-full bg-black/50 fixed left-0 top-0 z-[79]"
        ></div>
      )}
      <div
        className={`fixed left-0 top-0 ${isOpen ? "block" : "hidden"} z-[9999]`}
      >
        <ProjectImages
          service={product}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsOpen={setIsOpen}
        />
      </div>
      {isCartOpen && (
        <div className="z-[80] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[76vh] max-w-[30rem] overflow-y-scroll bg-white px-4 py-8 sm:px-6 lg:px-8 h-max lg:w-max">
          <p className="text-3xl text-black font-bold">Koszyk</p>
          <div className="flex flex-col items-center justify-center w-full">
            {!cart?.length && (
              <>
                <FaShoppingCart className="text-7xl text-gray-400 mt-12" />
                <p className="text-gray-400 mt-5 text-center text-sm lg:text-base mb-3">
                  Twój koszyk jest pusty...
                </p>
              </>
            )}
            {cart?.length !== 0 && (
              <div className="grid grid-cols-1 mt-8 text-zinc-800 drop-shadow-md shadow-black w-full">
                {cart?.map((item: ArtworkData, i: any) => (
                  <div key={i}>
                    <div className="flex flex-row justify-between bg-gray-200 w-full">
                      <div className="flex flex-row items-start w-full p-2">
                        <div className="aspect-square w-24 h-24">
                          <Image
                            width={244}
                            height={244}
                            src={item?.mainImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="pl-2 w-full">
                          <p className="text-lg font-bold">{item.title}</p>
                          <p className="font-bold text-lg">
                            {item.price > 0 && getPolishCurrency(item.price)}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item.dimensions}
                          </p>
                          <button
                            onClick={() => {
                              dispatch(removeFromCart(item));
                            }}
                            className="text-sm text-gray-500 underline hover:text-gray-600"
                          >
                            usuń
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-300 my-4" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6 relative">
            <div className="space-y-4 text-center">
              {cart?.length === 0 && (
                <button
                  disabled={!cart?.length}
                  className="disabled:cursor-not-allowed hover:disabled:blur-sm duration-200 block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-900 w-full"
                >
                  Do płatności
                </button>
              )}
              {cart?.length > 0 && (
                <Link
                  title="Przejdź do płatności"
                  href="/checkout"
                  className="duration-200 block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-900 w-full"
                >
                  Do płatności
                </Link>
              )}
              <button
                onClick={() => setCartOpen(false)}
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Kontynuuj zakupy
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="group relative cursor-pointer"
        onClick={() => setOpenedImage(product.id)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-black/50 group-hover:from-black/50 group-hover:to-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white font-bold text-sm mb-1">{product.price}</p>
            <h2 className="text-white font-bold text-lg line-clamp-2">
              {product.title}
            </h2>
          </div>
        </div>
        <Image
          width={800}
          height={800}
          src={product.mainImage}
          alt={product.title}
          className="w-full h-full"
        />
      </div>

      {openedImage === product.id && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white z-50 overflow-y-scroll left-0 top-0 lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 fixed"
        >
          <div className="h-screen lg:h-[80vh] p-4 lg:p-12 w-screen lg:max-w-[80vw]">
            <div className="bg-gray-100 border border-gray-500 p-3">
              <h2 className="text-black drop-shadow-lg text-xl sm:text-3xl xl:text-4xl font-bold">
                {product.title}
              </h2>
              <div className="mt-2 flex flex-wrap w-full gap-x-4 gap-y-2">
                <div className="text-zinc-600 drop-shadow-lg shadow-black text-sm lg:text-lg">
                  Wymiary: <strong>{product.dimensions}</strong>
                </div>

                <div className="text-zinc-600 drop-shadow-lg shadow-black text-sm lg:text-lg">
                  Artysta: <strong>blackbell.c.e</strong>
                </div>

                <div className="text-zinc-600 drop-shadow-lg shadow-black text-sm lg:text-lg">
                  Oryginał: <strong>Tak</strong>
                </div>
              </div>
              {product.price > 0 && (
                <span className="w-max block text-white bg-black px-3 py-1 mt-3 drop-shadow-lg shadow-black">
                  {getPolishCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="mt-8">
              <div className="text-zinc-600 drop-shadow-lg shadow-black text-lg">
                Opis
              </div>
              <Viewer value={product.description} />
              <div className="mt-4 flex flex-wrap gap-2">
                {product?.tags.map((item: any, i: any) => (
                  <div key={item}>#{polishToEnglish(item)}</div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <ProductImages
                product={product}
                setCurrentIndex={setCurrentIndex}
                setIsOpen={setIsOpen}
              />
            </div>
            <div className="flex justify-center lg:justify-start mt-5">
              {/* cartbtn */}
              <button
                onClick={handleAddToCart}
                className={`bg-zinc-500 hover:bg-zinc-600 text-white py-3 px-8 text-lg sm:text-base xl:text-lg font-bold uppercase tracking-wider ${
                  cart?.find((i: any) => i.id === product.id)
                    ? "duration-300 cursor-not-allowed"
                    : ""
                }`}
                disabled={cart?.find((i: any) => i.id === product.id)}
              >
                {cart?.find((i: any) => i.id === product.id) ? (
                  <div className="flex flex-row items-center">
                    <FaCheck className="text-green-400 mr-2" />
                    Dodano do koszyka
                  </div>
                ) : (
                  "Dodaj do koszyka"
                )}
              </button>
              <button
                onClick={() => setCartOpen(!isCartOpen)}
                className={`flex justify-center items-center group w-16 bg-black z-[150]`}
              >
                <div className="absolute rounded-full p-1 h-max w-auto text-white font-bold text-2xl right-1 bottom-1 aspect-square">
                  {cart?.length === 0 ? "" : cart?.length}
                </div>
                <FaShoppingCart className="text-xl text-white" />
              </button>
            </div>
            <div className="bg-gray-200 p-3 mt-5 text-sm">
              Wszystkie moje obrazy są oryginalnymi, unikatowymi dziełami
              stworzonymi przeze mnie. Każdy egzemplarz powstaje z pasją i
              dbałością o detale, dzięki czemu masz pewność, że otrzymujesz
              autentyczne, ręcznie wykonane dzieło sztuki. Kopiowanie,
              reprodukcja i wykorzystywanie moich prac bez mojej zgody są
              zabronione.
            </div>
            <div className="pb-6">
              <h3 className="mt-8 text-black text-lg sm:text-xl xl:text-2xl text-center lg:text-left font-bold flex flex-row items-center">
                Zobacz więcej
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-3 gap-y-5 my-5">
                {products?.map((item: any, i: any) => (
                  <div
                    className={`border border-gray-500 ${
                      item.title === product.title && "hidden"
                    }`}
                    key={item.title}
                  >
                    <button
                      key={i}
                      onClick={() => setOpenedImage(item.id)}
                      className="text-blue-400 flex flex-col relative overflow-y-hidden group drop-shadow-sm shadow-black"
                    >
                      <Image
                        src={item.images[0].src}
                        width={1024}
                        height={1024}
                        alt={`Obraz na płótnie ${item.title}`}
                        className=" w-full h-full object-cover drop-shadow-lg shadow-black"
                      />
                      <div
                        className={`absolute bottom-0 left-0 bg-[#444444] p-2 flex flex-col items-start justify-start w-full transition-all`}
                      >
                        {item.title}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {openedImage !== null && (
        <div
          className="z-[21] bg-black/70 fixed left-0 top-0 w-full h-screen"
          onClick={() => setOpenedImage(null)}
        ></div>
      )}
    </>
  );
}
