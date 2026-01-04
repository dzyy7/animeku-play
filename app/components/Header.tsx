"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50 w-full">
      <div className="px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link className="flex items-center gap-3 text-white group" href="/">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">play_arrow</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
              AnimeKuPlay
            </h2>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              className="text-white hover:text-primary font-medium transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-slate-400 hover:text-white font-medium transition-colors"
              href="/Catalog"
            >
              Catalog
            </Link>
          </nav>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              className="block w-full rounded-full bg-surface-dark/50 border border-transparent focus:border-primary/50 focus:bg-surface-dark focus:ring-2 focus:ring-primary/20 text-white placeholder-slate-400 sm:text-sm pl-10 pr-3 py-2.5 transition-all"
              placeholder="Search anime..."
              type="text"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
