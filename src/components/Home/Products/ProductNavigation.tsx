import { FaLongArrowAltLeft, FaPhone, FaShoppingCart } from "react-icons/fa";

export default function ProductNavigation({
  setOpenedImage,
  setCartOpen,
}: {
  setOpenedImage: Function;
  setCartOpen: Function;
}) {
  return (
    <div className="z-[102] sticky bottom-0 left-0 w-full h-12 bg-gray-700 text-gray-200 rounded-t-xl grid grid-cols-3">
      <button
        onClick={() => setOpenedImage(null)}
        className="flex flex-col items-center justify-center text-xs"
      >
        <FaLongArrowAltLeft className="text-lg" />
        Powrót
      </button>
      <button
        onClick={() => setCartOpen(true)}
        className="flex flex-col items-center justify-center text-xs border-x border-gray-500"
      >
        <FaShoppingCart className="text-lg" />
        Koszyk
      </button>
      <button
        onClick={() => setOpenedImage(null)}
        className="flex flex-col items-center justify-center text-xs"
      >
        <FaPhone className="text-lg" />
        Kontakt
      </button>
    </div>
  );
}
