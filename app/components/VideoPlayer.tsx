"use client";
import { useState } from "react";

interface VideoPlayerProps {
  thumbnail: string;
  videoUrl: string;
}

export default function VideoPlayer({ thumbnail, videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
      {isPlaying ? (
        <iframe
          src={videoUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <div className="relative w-full h-full group">
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${thumbnail}')` }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={togglePlay}
              className="flex shrink-0 items-center justify-center rounded-full size-20 bg-primary/90 text-white backdrop-blur-sm hover:scale-110 transition-transform shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] pl-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[48px] fill-1">
                play_arrow
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
