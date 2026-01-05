import { AnimeItem } from "@/lib/api";
import Link from "next/link";

interface LatestUpdatesProps {
  animeList: AnimeItem[];
}

export default function LatestUpdates({ animeList }: LatestUpdatesProps) {
  return (
    <section className="py-6 px-4 md:px-8 lg:px-12 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Latest Updates
        </h2>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map((item) => (
          <Link
            key={item.animeId}
            href={`/anime/${item.animeId}`}
            className="flex gap-4 p-3 rounded-xl bg-surface-dark border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <div className="w-24 aspect-video rounded-lg overflow-hidden bg-black relative shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${item.poster}")` }}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <h4 className="font-bold text-white truncate group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {item.episodes ? `Episode ${item.episodes}` : "Ongoing"}
              </p>
              <span
                className={`mt-2 text-[10px] uppercase font-bold tracking-wider text-green-400`}
              >
                {item.latestReleaseDate || "Recently Updated"}
              </span>
            </div>
            <div className="flex items-center justify-center px-2">
              <span className="material-symbols-outlined text-gray-500 group-hover:text-white">
                play_circle
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
