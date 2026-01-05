"use client";

import { AnimeItem } from "@/lib/api";
import AnimeCard from "./AnimeCard";
import { useRef } from "react";

interface OngoingAnimeProps {
  animeList: AnimeItem[];
}

export default function OngoingAnime({ animeList }: OngoingAnimeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-6 px-4 md:px-8 lg:px-12 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Ongoing Anime
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="size-8 rounded-full bg-surface-dark hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back_ios_new
            </span>
          </button>

          <button
            onClick={() => scroll("right")}
            className="size-8 rounded-full bg-surface-dark hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_forward_ios
            </span>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory"
      >
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            id={anime.animeId}
            image={anime.poster}
            title={anime.title}
            subtitle={
              anime.latestReleaseDate
                ? `Latest: ${anime.latestReleaseDate}`
                : "Ongoing"
            }
            episode={`Ep ${anime.episodes || "?"}`}
            variant="card"
          />
        ))}
      </div>
    </section>
  );
}
