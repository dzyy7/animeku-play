"use client";

import { useState } from "react";

const genres = [
  { name: "Popular", icon: "local_fire_department", color: "primary", isActive: true },
  { name: "Action", color: "red" },
  { name: "Romance", color: "pink" },
  { name: "Isekai", color: "purple" },
  { name: "Shonen", color: "blue" },
  { name: "Slice of Life", color: "emerald" },
  { name: "Sports", color: "orange" },
  { name: "Mecha", color: "indigo" },
  { name: "Horror", color: "rose" },
  { name: "Sci-Fi", color: "cyan" },
];

export default function CatalogFilters() {
  const [activeGenre, setActiveGenre] = useState("Popular");

  const getGenreStyles = (genre: typeof genres[0]) => {
    const isActive = activeGenre === genre.name;
    
    if (genre.color === "primary") {
      return isActive
        ? "bg-primary text-white shadow-lg shadow-primary/25"
        : "bg-primary/10 border border-primary/20 text-primary-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20";
    }

    const colorMap: Record<string, string> = {
      red: isActive
        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
        : "bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20",
      pink: isActive
        ? "bg-pink-500 text-white shadow-lg shadow-pink-500/25"
        : "bg-pink-500/10 border border-pink-500/20 text-pink-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20",
      purple: isActive
        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
        : "bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20",
      blue: isActive
        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
        : "bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20",
      emerald: isActive
        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
        : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20",
      orange: isActive
        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
        : "bg-orange-500/10 border border-orange-500/20 text-orange-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20",
      indigo: isActive
        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
        : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20",
      rose: isActive
        ? "bg-rose-700 text-white shadow-lg shadow-rose-900/25"
        : "bg-rose-900/20 border border-rose-800/30 text-rose-300 hover:bg-rose-700 hover:text-white hover:border-rose-700 hover:shadow-lg hover:shadow-rose-900/20",
      cyan: isActive
        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
        : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20",
    };

    return colorMap[genre.color] || "";
  };

  return (
    <section>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre.name}
            onClick={() => setActiveGenre(genre.name)}
            className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 ${getGenreStyles(
              genre
            )}`}
          >
            {genre.icon && (
              <span className="material-symbols-outlined text-[20px]">
                {genre.icon}
              </span>
            )}
            <span>{genre.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}