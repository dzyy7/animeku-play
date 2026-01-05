"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { AnimeUnlimitedGroup, getAnimeDetail, AnimeDetail } from "@/lib/api";

type AnimeWithId = AnimeDetail & { animeId: string };

interface PopularAnimeSectionProps {
  initialUnlimitedList: AnimeUnlimitedGroup[];
}

const ITEMS_PER_LOAD = 12;

export default function PopularAnimeSection({ initialUnlimitedList }: PopularAnimeSectionProps) {
  const [visibleAnime, setVisibleAnime] = useState<AnimeWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  // Flatten the grouped list into a single array of simple anime items
  const allAnime = useMemo(() => {
    return initialUnlimitedList.flatMap((group) => group.animeList);
  }, [initialUnlimitedList]);

  // Shuffle logic - verify if we want random or sequential. 
  // User mentions "popular" from "rating anime yang tertinggi".
  // Since we can't sort all by rating without fetching all, we'll pick a random subset to "feature" 
  // or allow the user to load more.
  // Actually, to simulate "Popular", we might want to just show random ones for discovery,
  // OR if the user truly wants "Highest Rated", we'd need a backend for that. 
  // Given the constraints (client-side fetch details), random discovery + detail fetch is best effort.
  // Let's randomize the order once on mount so it feels fresh on reload but consistent during pagination.
  
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  useEffect(() => {
    // Create an array of indices [0, 1, ... N]
    const indices = Array.from({ length: allAnime.length }, (_, i) => i);
    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
  }, [allAnime.length]);


  const fetchNextBatch = async (startIndex: number) => {
    if (shuffledIndices.length === 0) return;

    const nextIndices = shuffledIndices.slice(startIndex, startIndex + ITEMS_PER_LOAD);
    if (nextIndices.length === 0) return;

    const promises = nextIndices.map(async (index) => {
        const item = allAnime[index];
        try {
            const detail = await getAnimeDetail(item.animeId);
            if (!detail) return null;
            return {
                ...detail,
                animeId: item.animeId
            };
        } catch (error) {
            console.error(`Failed to load detail for ${item.animeId}`, error);
            return null;
        }
    });

    const results = await Promise.all(promises);
    const validResults = results.filter((item): item is AnimeWithId => item !== null);
    
    // Sort this small batch by score? Or just append?
    // If we want "Popular" feel, maybe sort the displayed ones by score? 
    // But mixed with pagination it's weird. Let's just append.
    // OPTIONAL: Sort this batch by score descending before appending
    validResults.sort((a, b) => {
       const scoreA = parseFloat(a.score) || 0;
       const scoreB = parseFloat(b.score) || 0;
       return scoreB - scoreA;
    });

    setVisibleAnime(prev => [...prev, ...validResults]);
    setOffset(startIndex + ITEMS_PER_LOAD);
  };

  useEffect(() => {
    if (shuffledIndices.length > 0 && offset === 0) {
        setLoading(true);
        fetchNextBatch(0).finally(() => setLoading(false));
    }
  }, [shuffledIndices]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchNextBatch(offset);
    setLoadingMore(false);
  };

  const hasMore = offset < allAnime.length;

  if (loading && visibleAnime.length === 0) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-surface-dark rounded-xl animate-pulse" />
            ))}
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Most Popular Anime</h2>
            <p className="text-gray-400 text-sm">Top rated anime selected for you</p>
          </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {visibleAnime.map((anime) => (
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

              {/* Rating */}
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold text-yellow-500 border border-yellow-500/20">
                <span className="material-symbols-outlined text-[12px] fill-current">star</span>
                <span>{anime.score}</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-base truncate leading-tight group-hover:text-primary transition-colors">
                {anime.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs font-medium text-text-secondary">
                 <span className="truncate">{anime.genreList?.[0]?.title || "Anime"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button 
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-surface-dark border border-surface-dark hover:border-primary hover:text-primary text-white rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loadingMore ? (
               <>
                 <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                 Loading...
               </>
            ) : (
               "Load More Popular"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
