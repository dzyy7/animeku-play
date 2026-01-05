import { AnimeItem } from "@/lib/api";
import Link from "next/link";
import AnimeCard from "./AnimeCard";

interface CompletedMasterpiecesProps {
  animeList: AnimeItem[];
}

export default function CompletedMasterpieces({ animeList }: CompletedMasterpiecesProps) {
  return (
    <section className="py-6 px-4 md:px-8 lg:px-12 pb-20 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Completed
        </h2>
        
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
        {animeList.slice(0, 12).map((anime) => (
          <AnimeCard
            key={anime.animeId}
            id={anime.animeId}
            image={anime.poster}
            title={anime.title}
            episodeCount={anime.episodes ? `${anime.episodes} Eps` : undefined}
            rating={anime.score}
            showHdBadge={false}
            variant="poster"
          />
        ))}
      </div>
    </section>
  );
}
