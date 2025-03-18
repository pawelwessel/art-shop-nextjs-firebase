import { getPolishCurrency } from "../../../../utils/getPolishCurrency";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="bg-gray-100 border border-gray-400 p-3">
      <h2 className="font-cardo text-black drop-shadow-lg text-2xl sm:text-3xl xl:text-4xl font-bold">
        {product.title}
      </h2>
      <div className="mt-2 flex flex-wrap w-full gap-x-4 gap-y-2">
        <div className="text-gray-800 text-sm lg:text-lg">
          Wymiary: <strong className="font-coco">{product.dimensions}</strong>
        </div>

        <div className="text-gray-800 text-sm lg:text-lg">
          Artysta: <strong className="font-coco">blackbell.c.e</strong>
        </div>

        <div className="text-gray-800 text-sm lg:text-lg">
          Oryginał: <strong className="font-coco">Tak</strong>
        </div>
      </div>
      {product.price > 0 && (
        <span className="font-cardo w-max block text-white bg-black px-3 py-1 mt-3 drop-shadow-lg shadow-black">
          {getPolishCurrency(product.price)}
        </span>
      )}
    </div>
  );
}
