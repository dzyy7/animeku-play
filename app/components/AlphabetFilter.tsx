"use client";

import { useState } from "react";

const alphabet = [
  "All",
  "#",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

export default function AlphabetFilter() {
  const [activeLetter, setActiveLetter] = useState("All");

  return (
    <div className="w-full overflow-hidden ">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className={`shrink-0 rounded-lg px-${letter === "All" ? "4" : "3"} py-2 text-sm font-${
              letter === "All" ? "bold" : "medium"
            } transition-colors ${
              activeLetter === letter
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-surface-dark text-text-secondary hover:bg-surface-dark/80 hover:text-white"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}