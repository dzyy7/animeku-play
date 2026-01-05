"use client";

import { useState, useMemo } from "react";
import AnimeListItem from "@/app/components/AnimeListItem";
import { AnimeUnlimitedGroup, AnimeUnlimitedItem } from "@/lib/api";

const alphabet = [
  "All",
  "#",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const ITEMS_PER_PAGE = 6;

interface ClientAnimeCatalogProps {
  initialData: AnimeUnlimitedGroup[];
}

export default function ClientAnimeCatalog({ initialData }: ClientAnimeCatalogProps) {
  const [activeLetter, setActiveLetter] = useState("All");
  const [page, setPage] = useState(1);
  
  // Flatten the list for easier filtering/display if needed, 
  // or keep it grouped. Since the API groups by startWith, 
  // filtering by letter is just selecting the group.
  
  // 1. Get filtered list
  const filteredList = useMemo(() => {
    if (activeLetter === "All") {
      // Flatten all groups into one huge list
      return initialData.flatMap(group => group.animeList);
    } 
    
    // Find specific group
    const group = initialData.find(g => g.startWith.toUpperCase() === activeLetter);
    return group ? group.animeList : [];
  }, [initialData, activeLetter]);

  // 2. Paginate
  const visibleList = useMemo(() => {
    return filteredList.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredList, page]);

  const hasMore = visibleList.length < filteredList.length;

  const handleLetterChange = (letter: string) => {
    setActiveLetter(letter);
    setPage(1); // Reset to first page on filter change
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Alphabet Filter */}
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
            {alphabet.map((letter) => (
            <button
                key={letter}
                onClick={() => handleLetterChange(letter)}
                className={`shrink-0 rounded-lg px-${letter === "All" ? "4" : "3"} py-2 text-sm font-${
                letter === "All" ? "bold" : "medium"
                } transition-colors ${
                activeLetter === letter
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-surface-dark text-text-secondary hover:bg-surface-dark/80 hover:text-white"
                }`}
            >
                {letter}
            </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {visibleList.map((anime) => (
          <AnimeListItem 
            key={anime.animeId} 
            id={anime.animeId} 
            title={anime.title} 
            href={anime.href} 
          />
        ))}
      </div>

      {/* Load More */}
       {hasMore && (
        <div className="flex justify-center pt-8 pb-12">
            <button 
                onClick={handleLoadMore}
                className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-surface-dark border border-surface-dark hover:border-primary hover:text-primary text-white text-base font-bold transition-all"
            >
            Load More Anime
            </button>
        </div>
       )}

       {!hasMore && visibleList.length > 0 && (
         <div className="text-center py-8 text-text-secondary">
            You've reached the end of the list.
         </div>
       )}

       {visibleList.length === 0 && (
         <div className="text-center py-20">
            <h3 className="text-xl text-white font-bold">No anime found starting with "{activeLetter}"</h3>
         </div>
       )}
    </div>
  );
}
