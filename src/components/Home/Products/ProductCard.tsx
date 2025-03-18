import Image from "next/image";
import { getPolishCurrency } from "../../../../utils/getPolishCurrency";

export default function ProductCard({
  setOpenedImage,
  product,
}: {
  setOpenedImage: any;
  product: any;
}) {
  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => setOpenedImage(product.id)}
    >
      <div className="absolute z-[5] inset-0 bg-gradient-to-t from-black/10 to-black/50 group-hover:from-black/50 group-hover:to-black/50" />
      <div className="absolute z-[6] inset-0 flex items-center justify-center">
        <div className="text-center">
          {product.price > 0 && (
            <p className="group-hover:scale-110 scale-125 duration-700 font-cardo text-white font-bold text-sm mb-1">
              {getPolishCurrency(product.price)}
            </p>
          )}
          {product.price === 0 && (
            <p className="text-white font-bold text-sm mb-1">Zapytaj o cenę</p>
          )}
          <h2 className="font-cardo text-white font-bold text-lg line-clamp-2">
            {product.title}
          </h2>
        </div>
      </div>
      <div className="overflow-hidden">
        <Image
          width={800}
          height={800}
          src={product.mainImage || product.images[0].src}
          alt={product.title}
          className="w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3"
        />
      </div>
    </div>
  );
}
