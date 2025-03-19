"use client";
import { ArtworkData } from "@/types";
import { useState } from "react";
import Viewer from "@/components/Viewer";
import { useSelector } from "react-redux";
import ProductImages from "../ProductImages";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import ProjectImages from "../ProjectImages";
import Cart from "./Cart";
import ProductCard from "./ProductCard";
import ProductNavigation from "./ProductNavigation";
import Disclaimer from "./Disclaimer";
import ProductInteractions from "./ProductInteractions";
import ProductDetails from "./ProductDetails";
import PieceForm from "./PieceForm";
import MoreProducts from "./MoreProducts";

export default function Product({
  product,
  products,
  openedImage,
  setOpenedImage,
}: {
  product: ArtworkData;
  products: any[];
  openedImage: string;
  setOpenedImage: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const cart = useSelector((state: any) => state.shop.cart);
  const [isImageOpen, setImageOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [openedPiece, setOpenedPiece] = useState("");
  return (
    <>
      <PieceForm setOpenedPiece={setOpenedPiece} openedPiece={openedPiece} />
      <Cart isCartOpen={isCartOpen} setCartOpen={setCartOpen} cart={cart} />
      <ProjectImages
        service={product}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setImageOpen={setImageOpen}
        isImageOpen={isImageOpen}
      />
      <ProductCard setOpenedImage={setOpenedImage} product={product} />
      {openedImage === product.id && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white z-50 overflow-y-scroll left-0 top-0 lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 fixed"
        >
          <div className="relative h-screen lg:h-[80vh] p-4 lg:p-12 w-screen lg:max-w-[80vw]">
            <ProductDetails product={product} />
            <div className="mt-4">
              <div className="text-gray-800 text-lg border border-gray-400 px-3 py-1 w-max bg-gray-100 mb-4">
                OPIS
              </div>
              <Viewer value={product.description} />
              <div className="mt-4 flex flex-wrap gap-2">
                {product?.tags.map((item: any, i: any) => (
                  <div key={item}>#{polishToEnglish(item)}</div>
                ))}
              </div>
            </div>
            <ProductImages
              product={product}
              setCurrentIndex={setCurrentIndex}
              setImageOpen={setImageOpen}
            />
            <ProductInteractions
              setCartOpen={setCartOpen}
              setPieceForm={setOpenedPiece}
              product={product}
              cart={cart}
              isCartOpen={isCartOpen}
            />
            <Disclaimer />
            <MoreProducts
              setOpenedImage={setOpenedImage}
              products={products}
              product={product}
            />
            <ProductNavigation
              setOpenedImage={setOpenedImage}
              setCartOpen={setCartOpen}
            />
          </div>
        </div>
      )}
      {openedImage === product.id && (
        <div
          className="z-[21] bg-black/70 fixed left-0 top-0 w-full h-screen"
          onClick={() => setOpenedImage(null)}
        ></div>
      )}
    </>
  );
}
