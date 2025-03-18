import Image from "next/image";
import Link from "next/link";
import background from "../../../../../public/background.webp";
import bg from "../../../../../public/bg.png";
import { FaChevronDown } from "react-icons/fa";
export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-end overflow-hidden">
      <div className="relative h-[80vh] mt-12 flex flex-col justify-center items-center text-center w-full">
        <div className="absolute w-[95%] left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:w-full top-0 rounded-b-full bg-gradient-to-b from-transparent to-black/10 h-[55%] lg:h-[70%]"></div>
        <h1 className="font-cardo text-4xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 w-max max-w-full leading-tight">
          Sztuka, która mówi.
        </h1>
        <p className="my-6 sm:text-xl text-gray-700">
          Obrazy na płótnie – unikalne, wyraziste, stworzone z pasją.
        </p>
        <div className="z-[20] relative my-4 flex space-x-4 items-center">
          <Link
            href="/wycena-obrazu"
            className="bg-black text-white py-3 px-6 shadow-md transition duration-300 hover:bg-gray-800"
          >
            Zamów obraz
          </Link>
          <Link
            href="https://www.facebook.com/blackbell.c.e"
            target="_blank"
            className=" text-gray-800 transition duration-300 hover:text-gray-600"
          >
            O mnie →
          </Link>
        </div>
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
