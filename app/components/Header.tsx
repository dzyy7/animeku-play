"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Anime List", href: "/AnimeList" },
    { name: "Genre", href: "/genre" },
  ];
const hideSearch = pathname === "/AnimeList";

  return (
    <>
      <header className="sticky top-0 z-[60] w-full h-16 md:h-20 bg-background/60 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto h-full px-4 md:px-10 flex items-center justify-between">
          
          {/* 1. LEFT SECTION: LOGO */}
          <div className="flex-1 flex items-center">
            <Link className="relative flex items-center shrink-0" href="/">
              <div className="w-14 h-14 ml-4 md:w-16 md:h-16 flex items-center justify-center">
                <img 
                  src="/icon.svg" 
                  alt="Logo" 
                  className="absolute w-30 h-30 md:w-36 md:h-36 ml-2 max-w-none transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                />
              </div>
            </Link>
          </div>

          {/* 2. CENTER SECTION: NAV LINKS (Desktop Only) */}
          <nav className="hidden md:flex items-center justify-center gap-8 flex-[2]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-md font-medium transition-colors group ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 origin-left ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT SECTION: SEARCH & BURGER */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* SEARCH BAR */}
            {!hideSearch && (
              <form
                onSubmit={handleSearch}
                className="relative group w-full max-w-[180px] md:max-w-[340px] transition-all duration-300 focus-within:max-w-[180px] md:focus-within:max-w-xs"
              >
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-lg md:text-xl">
                  search
                </span>
                <input
                type="text"
                placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 text-white text-xs md:text-sm pl-9 md:pl-10 pr-4 py-1.5 md:py-2.5 transition-all outline-none"
                />
              </form>
            )}


            {/* MOBILE BURGER */}
            <button 
              className="md:hidden flex flex-col justify-center items-center gap-1.5 z-[70] w-10 h-10 transition-all active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0 translate-x-2" : ""}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (Tetap sama) */}
      <div className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
        <nav className={`absolute right-0 top-0 h-full w-2/3 bg-surface-dark/95 border-l border-white/10 p-8 pt-24 flex flex-col gap-6 transform transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-bold tracking-wide transition-all ${
                pathname === link.href ? "text-primary translate-x-2" : "text-slate-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}