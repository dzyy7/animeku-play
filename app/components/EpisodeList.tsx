"use client";

import { useState } from "react";
import Link from "next/link";

interface Episode {
  number: number;
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  hasSub: boolean;
  hasDub: boolean;
  quality?: string;
  isCurrentlyPlaying?: boolean;
}

interface EpisodeListProps {
  animeId: string;
  episodes: Episode[];
}

export default function EpisodeList({ animeId, episodes }: EpisodeListProps) {
  const [activeTab, setActiveTab] = useState("episodes");

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex items-center border-b border-[#1e293b]">
        <button
          className={`relative px-6 py-3 font-medium text-base transition-colors ${
            activeTab === "episodes"
              ? "text-white"
              : "text-[#94a3b8] hover:text-white"
          }`}
          onClick={() => setActiveTab("episodes")}
        >
          Episode List
          {activeTab === "episodes" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
        <button
          className={`relative px-6 py-3 font-medium text-base transition-colors ${
            activeTab === "comments"
              ? "text-white"
              : "text-[#94a3b8] hover:text-white"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments (124)
          {activeTab === "comments" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
        <button
          className={`relative px-6 py-3 font-medium text-base transition-colors ${
            activeTab === "related"
              ? "text-white"
              : "text-[#94a3b8] hover:text-white"
          }`}
          onClick={() => setActiveTab("related")}
        >
          Related
          {activeTab === "related" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Episode List Content */}
      {activeTab === "episodes" && (
        <div className="flex flex-col gap-1">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wider text-[#94a3b8] font-semibold">
            <span className="flex-1">Episode Title</span>
            <span className="w-32 text-center hidden md:block">Date</span>
            <span className="w-24 text-right hidden md:block">Duration</span>
          </div>

          {/* Episodes */}
          {episodes.map((episode) => (
            <Link
              key={episode.number}
              href={`/anime/${animeId}/watch/${episode.number}`}
              className={`group flex items-center gap-4 ${
                episode.isCurrentlyPlaying ? "bg-[#1e293b]" : "bg-transparent"
              } hover:bg-[#334155] p-3 rounded-lg border border-transparent hover:border-primary/30 transition-all cursor-pointer`}
            >
              <div className="relative w-28 aspect-video rounded overflow-hidden bg-black">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `url("${episode.thumbnail}")` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                  <span className="material-symbols-outlined text-white text-2xl drop-shadow-lg group-hover:scale-110 transition-transform">
                    play_circle
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="text-white text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                  <span
                    className={`${
                      episode.isCurrentlyPlaying
                        ? "text-primary"
                        : "text-[#94a3b8]"
                    } font-bold mr-2`}
                  >
                    EP {episode.number.toString().padStart(2, "0")}
                  </span>
                  {episode.title}
                </h3>
                <div className="flex items-center gap-2">
                  {episode.hasSub && (
                    <span className="text-[#94a3b8] text-xs">Sub</span>
                  )}
                  {episode.hasSub && episode.hasDub && (
                    <span className="w-1 h-1 rounded-full bg-[#94a3b8]" />
                  )}
                  {episode.hasDub && (
                    <span className="text-[#94a3b8] text-xs">Dub</span>
                  )}
                  {episode.quality && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#94a3b8]" />
                      <span className="text-[#94a3b8] text-xs">
                        {episode.quality}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className="hidden md:block w-32 text-center text-[#94a3b8] text-sm">
                {episode.date}
              </span>
              <span className="hidden md:block w-24 text-right text-[#94a3b8] text-sm">
                {episode.duration}
              </span>
            </Link>
          ))}

          {/* Show More Button */}
          <div className="mt-4 flex justify-center">
            <button className="text-[#94a3b8] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
              Show more episodes
              <span className="material-symbols-outlined text-base">
                expand_more
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Comments Tab Placeholder */}
      {activeTab === "comments" && (
        <div className="text-[#94a3b8] text-center py-8">
          Comments section coming soon...
        </div>
      )}

      {/* Related Tab Placeholder */}
      {activeTab === "related" && (
        <div className="text-[#94a3b8] text-center py-8">
          Related anime coming soon...
        </div>
      )}
    </div>
  );
}
