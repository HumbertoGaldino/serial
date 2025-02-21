import Link from "next/link";
import { Marvel } from "next/font/google";
import SearchBar from "../SearchBar/SearchBar";

const marvel = Marvel({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header() {
  return (
    <header
      className={`${marvel.className} max-h-[10vh] flex items-center justify-between py-4 px-8 bg-slate-950`}
    >
      <SearchBar />
      <div className="flex items-center gap-4">
        <nav className="ml-10 flex space-x-8 tracking-[0.8em]">
          <a
            href="/profile"
            className="text-white border-r border-white pr-6 hover:text-gray-500 transition-colors duration-300"
          >
            PERFIL
          </a>
          <Link
            href="/discover"
            className="text-white hover:text-gray-500 transition-colors duration-300"
          >
            EXPLORAR
          </Link>
        </nav>
      </div>
    </header>
  );
}
