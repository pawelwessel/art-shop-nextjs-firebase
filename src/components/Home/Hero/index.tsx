import Image from "next/image";
import bg from "../../../../public/bg.png";
import Cta from "../CtaForm";
export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-end overflow-hidden">
      <div className="relative h-[80vh] mt-12 flex flex-col justify-center items-center text-center w-full">
        <div className="absolute w-[95%] left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:w-full top-0 rounded-b-full bg-gradient-to-b from-transparent to-black/10 h-[65%] lg:h-[70%]"></div>
        <h1 className="flex flex-col justify-center items-center font-cardo text-4xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 w-max max-w-full leading-tight">
          Symfonia kolorów
          <span className="block text-center my-6 text-lg sm:text-xl text-gray-700">
            Obrazy na płótnie – unikalne, wyraziste, stworzone z pasją.
          </span>
        </h1>
        <Cta label="Zamów obraz" />

        <div className="w-full my-12 overflow-hidden">
          <div className="flex w-max items-start ml-[100%]">
            <Image
              src={bg}
              alt="Obrazy na sprzedaż"
              className="w-full h-full move-from-right-to-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
