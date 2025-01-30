import headerLogo from "@/public/header_logo.png";
import Image from "next/image";

import { Athiti } from "next/font/google";
import { Marvel } from "next/font/google";

const marvel = Marvel({
  subsets: ["latin"],
  weight: ["400"],
});

const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Header() {
  return (
    <header
      className={`${marvel.className} flex items-center justify-between py-4 px-14 bg-gray-900/90`}
    >
      <div className="flex items-center gap-4">
        <Image src={headerLogo} alt="Header Logo" width={100} height={40} />
        <nav className="ml-10 flex space-x-8 tracking-[0.8em]">
          <a
            href="#perfil"
            className="text-white border-r border-white pr-6 hover:text-gray-500 transition-colors duration-300"
          >
            PERFIL
          </a>
          <a
            href="#explorar"
            className="text-white hover:text-gray-500 transition-colors duration-300"
          >
            EXPLORAR
          </a>
        </nav>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="PESQUISAR USUÁRIO"
          className={`${athiti.className} px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none`}
          aria-label="Search User"
          tabIndex={0}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors duration-300"
          aria-label="Search"
          tabIndex={0}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.5 10.5A6 6 0 1110.5 4.5a6 6 0 016 6z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
