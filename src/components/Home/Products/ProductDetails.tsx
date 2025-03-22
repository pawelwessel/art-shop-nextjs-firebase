import { getPolishCurrency } from "../../../../utils/getPolishCurrency";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="bg-gray-100 border border-gray-400 p-3">
      <h2 className="font-cardo text-black drop-shadow-lg text-2xl sm:text-3xl xl:text-4xl font-bold">
        {product.title}
      </h2>
      <div className="mt-2 flex flex-wrap w-full gap-x-4 gap-y-2">
        {product.category !== "stickers" && (
          <div className="text-gray-800 text-sm lg:text-lg">
            Wymiary:{" "}
            <strong className="font-cardo">{product.dimensions}</strong>
          </div>
        )}
        <div className="text-gray-800 text-sm lg:text-lg">
          Autor:{" "}
          <strong className="font-cardo">
            Eliza Czerwińska (blackbell.c.e)
          </strong>
        </div>
        {product.category !== "stickers" && product.category !== "prints" && (
          <div className="text-gray-800 text-sm lg:text-lg">
            Oryginał: <strong className="font-cardo">Tak</strong>
          </div>
        )}
        {product.category === "stickers" && (
          <div className="text-gray-800 text-sm lg:text-lg">
            Rodzaj: <strong className="font-cardo">Naklejki</strong>
          </div>
        )}
        {product.category === "stickers" && (
          <div className="text-gray-800 text-sm lg:text-lg">
            Sztuki: <strong className="font-cardo">Wiele</strong>
          </div>
        )}
        {product.category === "prints" && (
          <div className="text-gray-800 text-sm lg:text-lg">
            Rodzaj: <strong className="font-cardo">Druk</strong>
          </div>
        )}
      </div>
      {product.category === "stickers" && (
        <div className="text-gray-500 text-sm">
          Naklejki wysyłam w zestawie, holograficzne i zwykłe. Wycinam je
          ręcznie i w różnych rozmiarach, aby każda znalazła swoje miejsce. W
          zestawie najprawdopodobniej znajdziesz dodatki od serca.
        </div>
      )}
      {product.price > 0 && (
        <span className="font-cardo w-max block text-white bg-black px-3 py-1 mt-3 drop-shadow-lg shadow-black">
          {getPolishCurrency(product.price)}
        </span>
      )}
    </div>
  );
}
