"use client";

import Image from "next/image";

export default function ProductImages({
  product,
  setCurrentIndex,
  setImageOpen,
}: {
  product: any;
  setCurrentIndex: any;
  setImageOpen: any;
}) {
  return (
    <div className="mt-8 grid grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
      {product.images.map((image: any, i: any) => (
        <div
          onClick={() => {
            setCurrentIndex(i);
            setImageOpen(true);
          }}
          key={i}
          className="aspect-square cursor-pointer"
        >
          <Image
            src={image.src}
            width={244}
            height={244}
            alt="Obraz namalowany na płótnie"
            className="w-full h-full object-cover drop-shadow-lg shadow-black"
          />
        </div>
      ))}
    </div>
  );
}
