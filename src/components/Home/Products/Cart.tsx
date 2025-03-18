import { ArtworkData } from "@/types";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { getPolishCurrency } from "../../../../utils/getPolishCurrency";
import { removeFromCart } from "@/redux/slices/shopSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({
  isCartOpen,
  setCartOpen,
  cart,
}: {
  isCartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: any;
}) {
  const dispatch = useDispatch();
  return (
    <>
      {isCartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="h-screen w-full bg-black/50 fixed left-0 top-0 z-[79]"
        ></div>
      )}
      {isCartOpen && (
        <div className="z-[80] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[76vh] w-[90%] md:w-[30rem] overflow-y-scroll bg-white p-4 sm:px-6 lg:px-8 h-max">
          <p className="font-cardo text-lg text-black font-bold">Koszyk</p>
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
              <div className="grid grid-cols-1 mt-4 text-zinc-800 drop-shadow-md shadow-black w-full">
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
                          <p className="font-bold">
                            {item.title}{" "}
                            {item.dimensions && (
                              <span className="font-normal text-gray-500">
                                ({item.dimensions})
                              </span>
                            )}
                          </p>
                          <p className="font-bold">
                            {item.price > 0 && getPolishCurrency(item.price)}
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
    </>
  );
}
