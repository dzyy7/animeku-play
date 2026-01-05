"use client";

import { useState } from "react";
import Link from "next/link";
import { Genre, AnimeItem, getAnimeByGenre } from "@/lib/api";

interface GenreSectionProps {
  genres: Genre[];
}

export default function GenreSection({ genres }: GenreSectionProps) {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnime = async (genreId: string, pageNum: number, reset: boolean) => {
    setLoading(true);
    try {
      const res = await getAnimeByGenre(genreId, pageNum);
      if (reset) {
        setAnimeList(res.data.animeList);
      } else {
        setAnimeList(prev => [...prev, ...res.data.animeList]);
      }
      setHasMore(res.data.pagination.hasNextPage);
    } catch (error) {
      console.error("Failed to fetch anime by genre", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre: Genre) => {
    if (selectedGenre?.genreId === genre.genreId) {
        // Deselect or just do nothing? Let's deselect to show "All" or similar?
        // Actually, if we deselect, we might want to hide the list.
        setSelectedGenre(null);
        setAnimeList([]);
        return;
    }
    
    setSelectedGenre(genre);
    setPage(1);
    fetchAnime(genre.genreId, 1, true);
  };

  const handleLoadMore = () => {
    if (!selectedGenre) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAnime(selectedGenre.genreId, nextPage, false);
  };

  return (
    <div className="space-y-8" id="genre-section">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
        
        {/* Genre Cloud */}
        <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
               const isActive = selectedGenre?.genreId === genre.genreId;
               return (
                  <button
                    key={genre.genreId}
                    onClick={() => handleGenreClick(genre)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/25" 
                        : "bg-surface-dark text-text-secondary hover:bg-surface-dark/80 hover:text-white"
                    }`}
                  >
                    {genre.title}
                  </button>
               );
            })}
        </div>
      </div>

      {/* Selected Genre Results */}
      {selectedGenre && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                <span className="text-primary">{selectedGenre.title}</span> Anime
              </h3>
           </div>

           {loading && animeList.length === 0 ? (
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] bg-surface-dark rounded-xl animate-pulse" />
                ))}
            </div>
           ) : (
             <>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {animeList.map((anime) => (
                    <Link
                        key={anime.animeId}
                        href={`/anime/${anime.animeId}`}
                        className="group flex flex-col gap-3 cursor-pointer"
                    >
                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-dark shadow-lg">
                        <img
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={anime.title}
                            src={anime.poster}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                            <button className="flex items-center justify-center bg-primary text-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">play_arrow</span>
                            </button>
                        </div>

                         {/* Status Badge */}
                         {anime.status && (
                             <div className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-md ${
                                 anime.status.toLowerCase() === "ongoing" 
                                 ? "bg-primary/80 text-white" 
                                 : "bg-green-500/80 text-white"
                             }`}>
                                 {anime.status}
                             </div>
                         )}
                        </div>

                        <div>
                        <h3 className="text-white font-bold text-base truncate leading-tight group-hover:text-primary transition-colors">
                            {anime.title}
                        </h3>
                         <div className="mt-1 text-xs font-medium text-text-secondary">
                             {anime.episodes ? `${anime.episodes} Episodes` : "TV Series"}
                         </div>
                        </div>
                    </Link>
                 ))}
               </div>
               
               {/* Load More for Genre */}
               {hasMore && (
                 <div className="flex justify-center pt-4">
                   <button 
                     onClick={handleLoadMore}
                     disabled={loading}
                     className="px-6 py-3 bg-surface-dark border border-surface-dark hover:border-primary hover:text-primary text-white rounded-xl font-bold transition-all disabled:opacity-50"
                   >
                     {loading ? "Loading..." : "Load More"}
                   </button>
                 </div>
               )}

               {!hasMore && animeList.length > 0 && (
                   <div className="text-center text-gray-500 py-4">End of results</div>
               )}
               
               {!loading && animeList.length === 0 && (
                   <div className="text-center py-12 text-gray-400">
                       No anime found in this genre yet.
                   </div>
               )}
             </>
           )}
        </div>
      )}
    </div>
  );
}
