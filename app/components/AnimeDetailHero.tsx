import Link from "next/link";

interface AnimeDetailHeroProps {
  anime: {
    id: string;
    title: string;
    titleHighlight?: string;
    poster: string;
    author: string;
    studio: string;
    year: string;
    rating: string;
    votes: string;
    genres: string[];
    description: string;
    status: string;
    ageRating: string;
  };
}

export default function AnimeDetailHero({ anime }: AnimeDetailHeroProps) {
  return (
    <section className="relative">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
        {/* Poster */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-2xl shadow-primary/20 ring-1 ring-white/10 group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url("${anime.poster}")` }}
            />
            {anime.status && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wide">
                {anime.status}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-end pb-2 gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              {anime.title}
              {anime.titleHighlight && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94a3b8]">
                  {" "}
                  {anime.titleHighlight}
                </span>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#94a3b8] text-sm font-medium">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  person
                </span>
                <span>{anime.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  movie
                </span>
                <span>{anime.studio}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  calendar_today
                </span>
                <span>{anime.year}</span>
              </div>
              <div className="flex items-center gap-1 text-white bg-[#1e293b] px-2 py-0.5 rounded text-xs">
                <span>{anime.ageRating}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 bg-[#1e293b]/30 p-3 rounded-lg border border-[#1e293b] w-fit backdrop-blur-sm">
            <span className="text-white text-2xl font-black">{anime.rating}</span>
            <div className="flex flex-col">
              <div className="flex text-yellow-400">
                <span className="material-symbols-outlined text-[18px] fill-current">
                  star
                </span>
                <span className="material-symbols-outlined text-[18px] fill-current">
                  star
                </span>
                <span className="material-symbols-outlined text-[18px] fill-current">
                  star
                </span>
                <span className="material-symbols-outlined text-[18px] fill-current">
                  star
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  star_half
                </span>
              </div>
              <span className="text-[#94a3b8] text-xs">{anime.votes} votes</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre, index) => (
              <Link
                key={index}
                className="px-3 py-1.5 rounded-full bg-[#1e293b] text-[#94a3b8] text-xs font-semibold hover:bg-primary hover:text-white transition-all uppercase tracking-wider"
                href="#"
              >
                {genre}
              </Link>
            ))}
          </div>

          {/* Description */}
          <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed max-w-3xl line-clamp-3 hover:line-clamp-none transition-all cursor-pointer group">
            {anime.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="flex items-center gap-3 bg-primary hover:bg-primary/80 text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5">
              <span className="material-symbols-outlined fill-current">
                play_arrow
              </span>
              Start Watching
            </button>
            <button className="flex items-center gap-3 bg-[#FF9F1C] hover:bg-[#ffb042] text-black px-6 py-3.5 rounded-lg font-bold text-base transition-all shadow-[0_4px_14px_0_rgba(255,159,28,0.39)] hover:shadow-[0_6px_20px_rgba(255,159,28,0.23)] hover:-translate-y-0.5">
              <span className="material-symbols-outlined">download</span>
              Download Batch
            </button>
            <div className="flex items-center gap-2 ml-auto md:ml-2">
              <button className="size-11 flex items-center justify-center rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-red-500 hover:bg-[#1e293b]/80 transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="size-11 flex items-center justify-center rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-white hover:bg-[#1e293b]/80 transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
