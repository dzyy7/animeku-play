"use client";

import { AnimeItem, Episode } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import AnimeCard from "./AnimeCard";

interface EpisodeListProps {
  animeId: string;
  episodes: Episode[];
  recommended: AnimeItem[];
}

export default function EpisodeList({ animeId, episodes, recommended }: EpisodeListProps) {
  const [activeTab, setActiveTab] = useState<"episodes" | "comments" | "related">(
    "episodes"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEpisodes = episodes.filter((ep) =>
    ep.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1e293b]">
        <button
          className={`relative px-6 py-3 font-medium text-base transition-colors ${
            activeTab === "episodes"
              ? "text-white"
              : "text-[#94a3b8] hover:text-white"
          }`}
          onClick={() => setActiveTab("episodes")}
        >
          Episodes ({episodes.length})
          {activeTab === "episodes" && (
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
          Related Anime
          {activeTab === "related" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Episode List */}
      {activeTab === "episodes" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">All Episodes</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search episode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1e293b] border border-[#1e293b] text-sm text-white rounded-lg px-4 py-2 pl-9 focus:outline-none focus:border-primary w-48 transition-colors"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] text-lg">
                search
              </span>
            </div>
          </div>

          <div className="flex flex-col rounded-xl overflow-hidden bg-[#151d2a] border border-[#1e293b]">
            <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wider text-[#94a3b8] font-semibold bg-[#111827]">
              <span className="flex-1">Episode Title</span>
              <span className="w-32 text-center hidden md:block">Date</span>
            </div>

            <div className="flex flex-col">
              {filteredEpisodes.map((episode) => (
                <Link
                  key={episode.episodeId}
                  href={`/anime/${animeId}/${episode.episodeId}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[#1e293b]/50 transition-colors border-b border-[#1e293b] last:border-0 group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-8 rounded-full bg-[#1e293b] flex items-center justify-center text-[#94a3b8] text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                      {episode.eps}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-medium text-gray-200 group-hover:text-primary transition-colors line-clamp-1">
                        {episode.title}
                      </h4>
                    </div>
                  </div>
                  <span className="hidden md:block w-32 text-center text-[#94a3b8] text-sm whitespace-nowrap">
                  {episode.date}
                  </span>
                </Link>
              ))}
              {filteredEpisodes.length === 0 && (
                <div className="p-8 text-center text-[#94a3b8]">
                  No episodes found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Related Tab */}
      {activeTab === "related" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recommended.map((anime) => (
            <AnimeCard
              key={anime.animeId}
              id={anime.animeId}
              image={anime.poster}
              title={anime.title}
              variant="poster"
            />
          ))}
          {recommended.length === 0 && (
            <div className="col-span-full p-8 text-center text-[#94a3b8]">
              No related anime found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
