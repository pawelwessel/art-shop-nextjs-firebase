import { setCart } from "@/redux/slices/shopSlice";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell, FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";

export default function ProductInteractions({
  product,
  cart,
  setCartOpen,
  setPieceForm,
  isCartOpen,
}: {
  product: any;
  cart: any;
  setCartOpen: any;
  setPieceForm: any;
  isCartOpen: any;
}) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    localStorage.setItem("cart", JSON.stringify(product));
    dispatch(setCart(product));
    setCartOpen(true);
  };
  return (
    <div className="flex mt-5">
      {/* cartbtn */}
      {product.price > 0 && (
        <button
          onClick={handleAddToCart}
          className={`bg-zinc-500 hover:bg-zinc-600 text-white py-3 px-8 font-bold ${
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
      )}
      {product.price > 0 && (
        <button
          onClick={() => setCartOpen(!isCartOpen)}
          className={` flex justify-center items-center group w-auto px-4 bg-black z-[101]`}
        >
          <div className="rounded-full h-max w-auto text-white font-bold text-2xl aspect-square">
            {cart?.length === 0 ? "" : cart?.length}
          </div>
          <FaShoppingCart className="text-xl text-white" />
        </button>
      )}
      {product.price === 0 && (
        <div>
          <button
            onClick={() => setPieceForm(product.title)}
            className="px-3 py-1.5 bg-black text-white flex items-center gap-2 hover:bg-gray-800 duration-200"
          >
            <FaBell />
            Zapytaj o cenę
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Ten obraz nie posiada ceny. Jesteś zainteresowany kupnem tego
            dzieła? Wypełnij formularz, a ja się do Ciebie odezwę!
          </p>
        </div>
      )}
    </div>
  );
}
