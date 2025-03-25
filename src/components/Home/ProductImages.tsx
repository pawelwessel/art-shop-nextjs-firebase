"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ImageWithSkeleton } from "./ImageLoadingSkeleton";

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
    <div className="mt-8 mb-4">
      <ResponsiveMasonry
        className="mt-4"
        columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3, 1360: 4 }}
      >
        <Masonry>
          {product.images.map((image: any, i: any) => (
            <ImageWithSkeleton
              key={i}
              src={image.src}
              index={i}
              setCurrentIndex={setCurrentIndex}
              setImageOpen={setImageOpen}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
