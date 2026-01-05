import Link from "next/link";

interface AnimeItem {
  id: string;
  title: string;
  image: string;
  episodes: string;
  status: string;
  badge?: string;
  badgeColor?: string;
}

interface AnimeListGridProps {
  animeList: AnimeItem[];
}

export default function AnimeListGrid({ animeList }: AnimeListGridProps) {
  const getBadgeColor = (color?: string) => {
    switch (color) {
      case "black":
        return "bg-black/60";
      case "primary":
        return "bg-primary/90";
      default:
        return "bg-black/60";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Ongoing" ? "text-primary" : "text-green-400";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {animeList.map((anime) => (
        <Link
          key={anime.id}
          href={`/anime/${anime.id}`}
          className="group flex flex-col gap-3 cursor-pointer"
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-dark shadow-lg">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt={anime.title}
              src={anime.image}
            />

            {/* Badge */}
            {anime.badge && (
              <div
                className={`absolute top-2 left-2 ${getBadgeColor(
                  anime.badgeColor
                )} backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white`}
              >
                {anime.badge}
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <button className="flex items-center justify-center bg-primary text-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  play_arrow
                </span>
              </button>
            </div>
          </div>

          {/* Anime Info */}
          <div>
            <h3 className="text-white font-bold text-base truncate leading-tight group-hover:text-primary transition-colors">
              {anime.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-text-secondary">
              <span>{anime.episodes}</span>
              <span className={`ml-auto ${getStatusColor(anime.status)}`}>
                {anime.status}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}