"use client";
import { useState, useEffect } from "react";
import { FaCookie, FaCookieBite } from "react-icons/fa";

const CookieInfo = () => {
  const [showCookieInfo, setShowCookieInfo] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    if (cookieAccepted === null || cookieAccepted === "false") {
      setTimeout(() => {
        setShowCookieInfo(true);
      }, 10000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShowCookieInfo(false);
  };

  return (
    <>
      <div
        className={`rounded-xl fixed duration-500 delay-500 -translate-x-[50%]  left-[50%]  bg-white text-black p-6 lg:p-12 z-[5000] prose lg:prose-xl w-[80vw] lg:w-max font-coco ${
          showCookieInfo
            ? "-translate-y-[50%] scale-100 top-[50%]"
            : "-translate-y-[20%] scale-50 top-[100%]"
        }`}
      >
        <h1 className="text-lg font-bold mb-2">
          Strona Artystki Blackbell używa cookies
        </h1>
        <p className="mb-2 !text-sm md:!text-lg lg:!text-xl">
          Używamy plików cookie w celu personalizacji treści i reklam,
          dostarczania funkcji mediów społecznościowych oraz analizowania ruchu
          na naszej stronie. Dzielmy się również informacjami na temat Twojego
          korzystania z naszej witryny z naszymi partnerami z zakresu mediów
          społecznościowych, reklamy oraz analizy, którzy mogą połączyć je z
          innymi informacjami, które podałeś lub które zebrali podczas
          korzystania z ich usług.
        </p>
        <div className="flex flex-row space-x-12 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-[-1] opacity-75">
          <FaCookie className="h-24 w-24 text-center mx-auto mb-4 text-orange-400" />
          <FaCookieBite className="h-24 w-24 text-center mx-auto mb-4 text-orange-400" />
        </div>
        <div className="flex justify-center items-center space-x-3">
          <button
            className="bg-[#8f26f3] duration-100 text-white py-2 px-4 rounded w-full"
            onClick={handleAccept}
          >
            Akceptuj
          </button>

          <button
            className="bg-[#8f26f3] duration-100 text-white py-2 px-4 rounded w-full"
            onClick={handleAccept}
          >
            Odrzuć
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieInfo;
