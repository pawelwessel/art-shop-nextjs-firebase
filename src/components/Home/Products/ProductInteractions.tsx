import { addDocument } from "@/firebase";
import { setCart } from "@/redux/slices/shopSlice";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { FaBell, FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const setLocalStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export default function ProductInteractions({
  product,
  cart,
  setCartOpen,
  setOpenedPiecePricing,
  openedPiecePricing,
  isCartOpen,
  formData,
  setFormData,
  isSending,
  setIsSending,
}: {
  product: any;
  cart: any;
  setCartOpen: any;
  openedPiecePricing: any;
  setOpenedPiecePricing: any;
  isCartOpen: any;
  formData: any;
  setFormData: any;
  isSending: any;
  setIsSending: any;
}) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    setLocalStorage("cart", JSON.stringify(product));
    dispatch(setCart(product));
    setCartOpen(true);
  };
  return (
    <div className="flex mt-5">
      {/* cartbtn */}
      {product.price > 0 && (
        <button
          onClick={handleAddToCart}
          className={` ${
            product?.sold
              ? "text-white bg-red-500 hover:bg-red-600"
              : "text-white bg-gray-500 hover:bg-gray-600"
          } duration-200 py-3 px-8 font-bold ${
            cart?.find((i: any) => i.id === product.id)
              ? "duration-300 cursor-not-allowed"
              : ""
          }`}
          disabled={
            cart?.find((i: any) => i.id === product.id) || product?.sold
          }
        >
          {!product.sold && (
            <>
              {cart?.find((i: any) => i.id === product.id) ? (
                <div className="flex flex-row items-center">
                  <FaCheck className="text-green-400 mr-2" />
                  Dodano do koszyka
                </div>
              ) : (
                "Dodaj do koszyka"
              )}
            </>
          )}
          {product.sold && "Obraz sprzedany"}
        </button>
      )}
      {product.price > 0 && (
        <button
          onClick={() => setCartOpen(!isCartOpen)}
          className={`hover:bg-gray-800 duration-200 flex justify-center items-center group w-auto px-4 bg-black z-[101]`}
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
            onClick={() => {
              if (openedPiecePricing === "") {
                setOpenedPiecePricing(product.title);
              } else {
                setOpenedPiecePricing("");
              }
            }}
            className="px-3 py-1.5 bg-black text-white flex items-center gap-2 hover:bg-gray-800 duration-200"
          >
            <FaBell />
            Zapytaj o cenę
          </button>
          {openedPiecePricing === product.title && (
            <div
              style={{ boxShadow: "0px 0px 3px black" }}
              className="mt-3 p-6 w-full bg-white z-[500]"
            >
              <div>
                <div className="flex gap-3">
                  <div>
                    <h2 className="font-bold text-sm sm:text-base">Imię:</h2>
                    <input
                      className="border border-gray-400 w-full sm:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500 mb-1"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      value={formData.name}
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm sm:text-base">
                      Numer telefonu:
                    </h2>
                    <input
                      className="border border-gray-400 w-full sm:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      value={formData.phone}
                      placeholder="Wpisz numer"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Porozmawiamy o projekcie w ciągu najbliższych dwóch dni
                  roboczych.
                </p>
              </div>
              {isSending === "success" && (
                <div className="text-green-500 animate-pulse mt-3">
                  Wysłano pomyślnie!
                </div>
              )}
              <div className="flex flex-col-reverse lg:flex-row items-center w-full mt-2">
                <button
                  onClick={() => setOpenedPiecePricing("")}
                  className="mt-2 lg:mr-4"
                >
                  Powrót
                </button>
                <button
                  disabled={isSending === "success"}
                  onClick={() => {
                    const id = uuidv4();
                    addDocument("leads", id, {
                      ...formData,
                      id,
                      type: "price",
                      product: product.title,
                    }).then(() => {
                      setIsSending("success");
                    });
                  }}
                  className="font-cardo flex flex-row items-center justify-center py-2 w-full text-base sm:w-max bg-black hover:bg-gray-800 duration-200 text-white font-bold mt-2 px-4"
                >
                  Otrzymaj wycenę <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Ten obraz nie posiada ceny. Jesteś zainteresowany kupnem tego
            dzieła? Wypełnij formularz, a ja się do Ciebie odezwę!
          </p>
        </div>
      )}
    </div>
  );
}
