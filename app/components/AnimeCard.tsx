import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react"; // Ikon lebih modern
import { cn } from "@/lib/utils"; // Utility standard shadcn/ui (opsional)

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
  const isCard = variant === "card";

  return (
    <Link 
      href={`/anime/${id}`} 
      className={cn(
        "group relative flex flex-col gap-3 transition-all duration-300",
        isCard ? "min-w-[200px] md:min-w-[240px] snap-start" : "w-full"
      )}
    >
      {/* Gambar Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-neutral-900 shadow-lg">
        {/* Next.js Image dengan Blur Placeholder */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Overlay Gradasi & Play Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-2xl scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play className="fill-white text-white translate-x-0.5" size={24} />
          </div>
        </div>

        {/* Badges Atas */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {showHdBadge && (
            <span className="rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-black text-white backdrop-blur-sm shadow-sm">
              HD
            </span>
          )}
        </div>

        {/* Episode Badge (Floating) */}
        {episode && (
          <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
             {episode}
          </div>
        )}
      </div>

      {/* Konten Informasi */}
      <div className="flex flex-col gap-1 px-0.5">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-neutral-100 transition-colors duration-300 group-hover:text-primary md:text-base">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-[12px]">
          {isCard ? (
            <p className="line-clamp-1 text-neutral-400 font-medium">{subtitle}</p>
          ) : (
            <>
              <span className="font-semibold text-neutral-500">
                {episodeCount || "TBA"}
              </span>
              
              {rating && (
                <div className="flex items-center gap-1 rounded-md bg-yellow-500/10 px-1.5 py-0.5">
                  <Star size={12} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-yellow-500">{rating}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}