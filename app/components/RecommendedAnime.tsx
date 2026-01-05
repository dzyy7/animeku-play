import Link from "next/link";
import { AnimeItem } from "@/lib/api";

interface RecommendedAnimeProps {
  animeList: AnimeItem[];
}

export default function RecommendedAnimeSection({
  animeList,
}: RecommendedAnimeProps) {

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          You Might Also Like
        </h2>
        <div className="flex gap-2">
          <button className="size-8 rounded-full bg-surface-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
          </button>
          <button className="size-8 rounded-full bg-surface-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
        {animeList.map((anime, index) => (
          <Link
            key={index}
            href={`/anime/${anime.animeId}`}
            className={`group cursor-pointer ${
              index === 4 ? "hidden lg:block" : ""
            } ${index === 5 ? "hidden xl:block" : ""}`}
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
              <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                {anime.episodes ? `EP ${anime.episodes}` : anime.latestReleaseDate || "N/A"}
              </div>
              {anime.score && (
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 z-10">
                  <span className="material-symbols-outlined text-[10px] text-yellow-400 fill-1">
                    star
                  </span>{" "}
                  {anime.score}
                </div>
              )}
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={anime.title}
                src={anime.poster}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="size-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="material-symbols-outlined fill-1">
                    play_arrow
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {anime.title}
            </h3>
            {/* Genre is not available in list item, maybe we can show something else or hide it */}
            {/* <p className="text-slate-400 text-xs mt-1">{anime.genre}</p> */}
          </Link>
        ))}
      </div>
    </section>
  );
}

