import Link from "next/link";

interface AnimeCardProps {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  episode?: string;
  rating?: string;
  episodeCount?: string;
  showHdBadge?: boolean;
  variant?: "poster" | "card";
}

export default function AnimeCard({
  id,
  image,
  title,
  subtitle,
  episode,
  rating,
  episodeCount,
  showHdBadge = false,
  variant = "poster",
}: AnimeCardProps) {
  if (variant === "card") {
    return (
      <Link
        href={`/anime/${id}`}
        className="min-w-[200px] md:min-w-[240px] snap-start card-hover cursor-pointer group"
      >
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-dark">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${image}")` }}
          />
          {episode && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-bold text-white border border-white/10">
              {episode}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">
                play_arrow
              </span>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <h3 className="font-bold text-white truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </Link>
    );
  }

  // Default poster variant
  return (
    <Link
      href={`/anime/${id}`}
      className="flex flex-col gap-2 group cursor-pointer"
    >
      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-dark card-hover">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${image}")` }}
        />
        {showHdBadge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary rounded text-[10px] font-bold text-white">
            HD
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="material-symbols-outlined text-4xl text-white drop-shadow-lg">
            play_circle
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-white leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          {episodeCount && (
            <span className="text-xs text-gray-400">{episodeCount}</span>
          )}
          {rating && (
            <span className="text-xs font-bold text-yellow-500 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px] fill-current">
                star
              </span>{" "}
              {rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
