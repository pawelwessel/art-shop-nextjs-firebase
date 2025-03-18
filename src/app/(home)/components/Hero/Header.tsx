"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header
      className={`z-50 w-full bg-[#303030] shadow-md ${
        pathname.includes("admin") && "hidden"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-10">
        <Link href="/" className="flex items-center space-x-3 text-white">
          <Image
            src="/images/image/common/logobbwWhite.png"
            width={40}
            height={40}
            alt="Blackbell Art logo"
            className="h-[40px] w-auto mix-blend-difference"
          />
          <span className="text-2xl font-bold">Blackbell Art</span>
        </Link>
        {/* <div
          className={`lg:space-x-3 fixed top-0 right-0 w-full h-screen bg-[#303030] flex flex-col items-start p-6 space-y-6 transform transition-transform duration-300 lg:relative lg:w-auto lg:h-auto lg:p-0 lg:space-y-0 lg:flex-row lg:items-center lg:justify-end ${
            isMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="mt-24 lg:mt-0 flex items-center space-x-2 text-white text-lg lg:text-base"
          >
            <FaHome />
            <span>Strona Główna</span>
          </Link>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-2 text-white text-lg lg:text-base"
          >
            <FaArtstation />
            <span>Blog</span>
          </Link>
        </div> */}
        {/* <button
          className="lg:hidden text-white text-2xl z-[100]"
          onClick={() => setMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Main Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button> */}
      </nav>
    </header>
  );
}
