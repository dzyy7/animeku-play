"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAnimeDetail, AnimeDetail } from "@/lib/api";

interface AnimeListItemProps {
  id: string;
  title: string;
  href: string;
}

export default function AnimeListItem({ id, title, href }: AnimeListItemProps) {
  const [detail, setDetail] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchDetail() {
  try {
    const detail = await getAnimeDetail(id);

    if (isMounted && detail) {
      setDetail(detail);
    }
  } catch (error) {
    console.error(`Failed to fetch detail for ${id}`, error);
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
}


    if (id) {
      fetchDetail();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 min-w-[150px]">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-dark animate-pulse" />
        <div className="flex flex-col gap-2">
            <div className="h-4 bg-surface-dark rounded animate-pulse w-3/4" />
            <div className="h-3 bg-surface-dark rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  const image = detail?.poster || "/placeholder.jpg"; // Fallback image
  const status = detail?.status || "Unknown";
  const episodes = detail?.episodes ? `${detail.episodes} Eps` : "Unknown";
  const rating = detail?.score;

  return (
    <Link
      href={`/anime/${id}`}
      className="group flex flex-col gap-3 cursor-pointer"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-dark shadow-lg">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={title}
          src={image}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <button className="flex items-center justify-center bg-primary text-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">
                play_arrow
            </span>
            </button>
        </div>
        
        {/* Rating Badge */}
        {rating && (
             <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold text-yellow-500 border border-yellow-500/20">
                <span className="material-symbols-outlined text-[12px] fill-current">star</span>
                <span>{rating}</span>
             </div>
        )}
      </div>

      <div>
        <h3 className="text-white font-bold text-base truncate leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs font-medium text-text-secondary">
          <span>{episodes}</span>
          <span className={`ml-auto ${status === "Ongoing" ? "text-primary" : "text-green-400"}`}>
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
}
