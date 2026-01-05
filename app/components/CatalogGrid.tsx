import Link from "next/link";

interface Anime {
  id: string;
  title: string;
  image: string;
  hasSub: boolean;
  hasDub: boolean;
  rating: string;
  badge?: string;
  badgeColor?: string;
  genres: string[];
}

interface CatalogGridProps {
  animeList: Anime[];
}

export default function CatalogGrid({ animeList }: CatalogGridProps) {
  const getBadgeColor = (color?: string) => {
    switch (color) {
      case "black":
        return "bg-black/60";
      case "primary":
        return "bg-primary/90";
      case "red":
        return "bg-red-600/90";
      default:
        return "bg-black/60";
    }
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
      {animeList.map((anime) => (
        <Link
          key={anime.id}
          href={`/anime/${anime.id}`}
          className="group flex flex-col gap-3 cursor-pointer"
        >
          <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-card-dark">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url("${anime.image}")` }}
            />
            
            {/* Hover Overlay with Play Button */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-primary/30">
                <span className="material-symbols-outlined !text-3xl">
                  play_arrow
                </span>
              </button>
            </div>

            {/* Badge */}
            {anime.badge && (
              <div
                className={`absolute top-2 left-2 ${getBadgeColor(
                  anime.badgeColor
                )} backdrop-blur-sm px-2 py-1 rounded-md border border-white/10`}
              >
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {anime.badge}
                </p>
              </div>
            )}
          </div>

          {/* Anime Info */}
          <div className="space-y-1">
            <h3 className="text-white text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {anime.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {anime.hasSub && (
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-medium">
                  SUB
                </span>
              )}
              {anime.hasDub && (
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-medium">
                  DUB
                </span>
              )}
              <span>•</span>
              <span className="flex items-center text-yellow-400 gap-0.5">
                {anime.rating}{" "}
                <span className="material-symbols-outlined text-[14px] fill-current">
                  star
                </span>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}