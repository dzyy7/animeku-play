"use client";

import { AnimeDetail } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroBannerProps {
  heroAnime: (AnimeDetail & { animeId: string })[];
}

export default function HeroBanner({ heroAnime }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (heroAnime.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroAnime.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroAnime.length]);

  if (!heroAnime || heroAnime.length === 0) return null;

  const currentAnime = heroAnime[currentIndex];

  return (
    // UBAH 1: Padding container luar dikurangi di mobile (px-4 -> px-0 atau px-4 kecil)
    <div className="w-full px-4 md:px-8 lg:px-12 pt-4 md:pt-6 pb-8">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 group
        {/* UBAH 2: Responsive Aspect Ratio & Height */}
        {/* Mobile: Tinggi fix/cukup tinggi (h-[550px]) biar gambar kelihatan poster-nya */}
        {/* Desktop: Aspect ratio cinematic (21/9) */}
        h-[550px] md:h-auto md:aspect-[21/9] md:min-h-[500px]"
      >
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url("${currentAnime.poster}")`,
          }}
        />
        
        {/* Gradient Overlay */}
        {/* Mobile: Gradient lebih gelap/tinggi supaya teks terbaca jelas */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 md:via-background-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-transparent to-transparent" />

        {/* Content Section */}
        {/* UBAH 3: Padding dalam lebih kecil di mobile */}
        <div className="absolute inset-0 p-6 md:p-12 lg:p-16 flex flex-col justify-end z-10">
          <div className="max-w-3xl flex flex-col gap-3 md:gap-4">
            
            {/* Title */}
            <Link href={`/anime/${currentAnime.animeId}`} className="inline-block group/title">
              {/* UBAH 4: Font size responsive (text-3xl di mobile) */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-lg line-clamp-2 group-hover/title:text-primary transition-colors">
                {currentAnime.title}
              </h1>
            </Link>

            {/* Meta Info */}
            <div className="flex items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-300 font-medium flex-wrap">
              {currentAnime.score && (
                <span className="flex items-center gap-1 text-yellow-400">
                  <span className="material-symbols-outlined text-sm fill-current">star</span>
                  {currentAnime.score}
                </span>
              )}
              <span className="hidden md:inline">{currentAnime.type}</span>
              <span>{currentAnime.duration}</span>
              <div className="flex gap-2">
                {currentAnime.genreList.slice(0, 3).map((genre) => (
                  <span
                    key={genre.genreId}
                    className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] md:text-xs backdrop-blur-sm"
                  >
                    {genre.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            {/* UBAH 5: Line clamp lebih sedikit di mobile biar gak menuhin layar */}
            <p className="text-gray-300 line-clamp-2 md:line-clamp-3 text-sm md:text-base leading-relaxed max-w-xl drop-shadow-md">
              {currentAnime.synopsis.paragraphs.join(" ") || "No synopsis available."}
            </p>

            {/* Action Buttons */}
            {/* UBAH 6: Tombol stack (atas bawah) di mobile kecil, dan row di tablet/desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pt-4">
              <Link href={`/anime/${currentAnime.animeId}`} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/25 active:scale-95">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Watch Now
                </button>
              </Link>
              
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-medium transition-all border border-white/10 active:scale-95">
                <span className="material-symbols-outlined">add</span>
                My List
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        {/* UBAH 7: Pindah posisi indikator biar gak ketutup jempol/konten di mobile */}
        <div className="absolute top-4 right-4 md:top-auto md:bottom-8 md:right-12 flex gap-2 z-20">
          {heroAnime.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 shadow-sm ${
                idx === currentIndex ? "w-6 md:w-8 bg-primary md:bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}