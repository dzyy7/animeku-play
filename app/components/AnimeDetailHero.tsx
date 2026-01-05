"use client";

import { BatchResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

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
    batchData?: BatchResponse | null;
  };
}

export default function AnimeDetailHero({ anime }: AnimeDetailHeroProps) {
  const [showBatchModal, setShowBatchModal] = useState(false);

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
  <div
    className={cn(
      "absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg uppercase tracking-wider backdrop-blur-md border border-white/10",
      anime.status.toLowerCase().includes("ongoing") 
        ? "bg-green-500/90 shadow-green-500/20" 
        : "bg-blue-600/90 shadow-blue-500/20"
    )}
  >
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
          <div className="flex items-center gap-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4 rounded-xl border border-slate-700/50 backdrop-blur-md shadow-lg shadow-black/20 w-fit">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {anime.rating}
            </span>
            <span className="text-slate-500 text-sm font-medium">/ 10</span>
          </div>

          {/* Divider Vertical */}

            {/* Bintang */}
              {/* (Disarankan membuat logic bintang dinamis di sini, lihat Opsi 2) */}

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
          <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed max-w-3xl line-clamp-3 hover:line-clamp-none transition-all cursor-pointer group whitespace-pre-wrap">
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
            {anime.batchData && (
              <button 
                onClick={() => setShowBatchModal(true)}
                className="flex items-center gap-3 bg-[#FF9F1C] hover:bg-[#ffb042] text-black px-6 py-3.5 rounded-lg font-bold text-base transition-all shadow-[0_4px_14px_0_rgba(255,159,28,0.39)] hover:shadow-[0_6px_20px_rgba(255,159,28,0.23)] hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined">download</span>
                Download Batch
              </button>
            )}
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

      {/* Batch Modal */}
      {showBatchModal && anime.batchData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowBatchModal(false)}>
          <div className="bg-[#1e293b] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl border border-white/10 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0f172a]">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white">Download Batch</h3>
                <p className="text-xs text-gray-400">Select quality and server to download</p>
              </div>
              <button 
                onClick={() => setShowBatchModal(false)} 
                className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
              {anime.batchData.data.downloadUrl.formats.length > 0 ? (
                anime.batchData.data.downloadUrl.formats.map((format, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h4 className="text-primary font-bold text-lg flex items-center gap-2">
                      <span className="w-1 h-5 bg-primary rounded-full"></span>
                      {format.title}
                    </h4>
                    <div className="grid gap-3">
                      {format.qualities.map((quality, qIdx) => (
                        <div key={qIdx} className="bg-[#0f172a] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-white text-base">{quality.title}</span>
                              <span className="text-[10px] font-bold text-black bg-[#FCA311] px-2 py-0.5 rounded shadow-sm">{quality.size}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {quality.urls.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 rounded-lg bg-[#1e293b] hover:bg-primary hover:text-white text-gray-300 text-xs font-medium transition-all border border-white/5 hover:border-primary/50 text-center truncate shadow-sm"
                                title={link.title}
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-10">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">folder_off</span>
                  <p>No batch links available.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-[#0f172a] border-t border-white/10 text-center">
               <p className="text-[10px] text-gray-500">Links are provided by third-party services.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
