import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useMemo } from "react";

export default function MoreProducts({
  product,
  products,
  setOpenedImage,
}: {
  product: any;
  products: any;
  setOpenedImage: Function;
}) {
  const displayedProducts = useMemo(() => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [products]);

  return (
    <div className="pb-6">
      <h3 className="mt-8 text-black text-lg sm:text-xl xl:text-2xl text-center lg:text-left font-bold flex flex-row items-center">
        Zobacz więcej
      </h3>
      <ResponsiveMasonry
        className="mt-4"
        columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3, 1360: 4 }}
      >
        <Masonry>
          {displayedProducts?.map((item: any, i: any) => (
            <div
              className={`border border-gray-500 ${
                item.title === product.title && "hidden"
              }`}
              key={item.title}
            >
              <button
                key={i}
                onClick={() => setOpenedImage(item.id)}
                className="flex flex-col relative overflow-y-hidden group drop-shadow-sm shadow-black"
              >
                <Image
                  src={item.images[0].src}
                  width={1024}
                  height={1024}
                  alt={`Obraz na płótnie ${item.title}`}
                  className=" w-full h-full object-cover drop-shadow-lg shadow-black"
                />
                <p
                  className={`text-sm text-left text-white absolute bottom-0 left-0 bg-black p-2 flex flex-col items-start justify-start w-full transition-all`}
                >
                  {item.title}
                </p>
              </button>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
