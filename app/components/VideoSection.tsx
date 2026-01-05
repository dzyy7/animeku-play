"use client";

import { useState, useCallback, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { EpisodeDetailResponse, ServerQuality, getServerStream } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VideoSectionProps {
  episodeData: EpisodeDetailResponse["data"];
  className?: string;
}

export default function VideoSection({ episodeData, className }: VideoSectionProps) {
  const router = useRouter();
  const [selectedQuality, setSelectedQuality] = useState<ServerQuality>(
    episodeData.server.qualities.find((q) => q.title === "720p") || 
    episodeData.server.qualities[0]
  );
  
  const [selectedServer, setSelectedServer] = useState<ServerQuality["serverList"][0] | null>(
    selectedQuality?.serverList[0] || null
  );

  const [streamUrl, setStreamUrl] = useState<string>(episodeData.defaultStreamingUrl);
  const [isLoadingStream, setIsLoadingStream] = useState(false);

  // Update selected server when quality changes
  const handleQualityChange = (qualityTitle: string) => {
    const newQuality = episodeData.server.qualities.find((q) => q.title === qualityTitle);
    if (newQuality) {
      setSelectedQuality(newQuality);
      
      // Try to find a matching server in the new quality list (by title prefix or similar)
      // or just default to the first one available
      if (newQuality.serverList.length > 0) {
        // Simple heuristic: Try to match by "similar" title or index if possible,
        // but for now, defaulting to the first one is safer ensuring a valid stream.
        // If we want to be smarter, we could check if selectedServer?.title matches partial title.
        
        let nextServerId = newQuality.serverList[0].serverId;

        if (selectedServer) {
            // Try to find a server with the same name/title (ignoring "hd" suffix etc if needed)
            // The user API shows names like "otakuwatch5" and "otakuwatch5hd".
            // We can try to match the base name.
            const currentTitleBase = selectedServer.title.toLowerCase().replace(/hd\s*$/, "").trim();
            const match = newQuality.serverList.find(s => 
                s.title.toLowerCase().replace(/hd\s*$/, "").trim() === currentTitleBase
            );
            if (match) {
                nextServerId = match.serverId;
            }
        }
        
        handleServerChange(nextServerId, newQuality);
      } else {
         // No servers for this quality (e.g. 360p case)
         setSelectedServer(null);
         setStreamUrl(""); // Clear stream or handle as "Not Available"
      }
    }
  };

  const handleServerChange = async (serverId: string, qualityContext?: ServerQuality) => {
    // specific quality context is needed because selectedQuality state might not be updated yet inside the event handler if we called it directly
    const currentQuality = qualityContext || selectedQuality;
    const server = currentQuality?.serverList.find((s) => s.serverId === serverId);
    if (!server) return;

    setSelectedServer(server);
    setIsLoadingStream(true);
    
    try {
      const response = await getServerStream(server.href);
      setStreamUrl(response.data.url);
    } catch (error) {
      console.error("Failed to fetch stream:", error);
      // Fallback or error handling could go here
    } finally {
      setIsLoadingStream(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Video Player Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {isLoadingStream && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        <VideoPlayer 
          key={streamUrl} // Force re-render on url change
          thumbnail=""
          // Use anime detail poster if available, otherwise fallback or empty
          videoUrl={streamUrl} 
        />
      </div>

      {/* Controls & Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href={episodeData.prevEpisode ? `/anime/${episodeData.animeId}/${episodeData.prevEpisode.episodeId}` : "#"}
            onClick={(e) => !episodeData.hasPrevEpisode && e.preventDefault()}
            aria-disabled={!episodeData.hasPrevEpisode}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20 cursor-pointer ${
              !episodeData.hasPrevEpisode ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">skip_previous</span>
            <span>Prev Ep</span>
          </Link>
          <Link
            href={episodeData.nextEpisode ? `/anime/${episodeData.animeId}/${episodeData.nextEpisode.episodeId}` : "#"}
            onClick={(e) => !episodeData.hasNextEpisode && e.preventDefault()}
            aria-disabled={!episodeData.hasNextEpisode}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20 cursor-pointer ${
              !episodeData.hasNextEpisode ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            <span>Next Ep</span>
            <span className="material-symbols-outlined text-[18px]">skip_next</span>
          </Link>
        </div>

        {/* Server & Quality Selection */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          
          {/* Quality Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Quality:</span>
            <div className="flex gap-1 bg-surface-dark p-1 rounded-lg border border-white/10">
              {episodeData.server.qualities.map((q) => (
                <button
                  key={q.title}
                  onClick={() => handleQualityChange(q.title)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    selectedQuality?.title === q.title
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {q.title}
                </button>
              ))}
            </div>
          </div>

          {/* Server Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Server:</span>
            <div className="relative flex-1 sm:min-w-[140px] group">
              <select
                value={selectedServer?.serverId || ""}
                onChange={(e) => handleServerChange(e.target.value)}
                disabled={!selectedQuality || selectedQuality.serverList.length === 0}
                className="appearance-none w-full bg-surface-dark text-white text-sm font-medium border border-white/10 rounded-lg pl-3 pr-10 py-2
                  transition-all duration-200
                  hover:border-white/20
                  focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
                  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedQuality?.serverList.map((server) => (
                  <option key={server.serverId} value={server.serverId} className="bg-surface-dark text-white">
                    {server.title}
                  </option>
                ))}
                {(!selectedQuality || selectedQuality.serverList.length === 0) && (
                  <option>No servers</option>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-accent group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
