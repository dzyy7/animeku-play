"use client";

import { useState } from "react";

interface ScheduleItem {
  time: string;
  timezone: string;
  poster: string;
  title: string;
  episode: string;
  isAired?: boolean;
}

interface ReleaseScheduleProps {
  scheduleItems: ScheduleItem[];
}

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function ReleaseSchedule({ scheduleItems }: ReleaseScheduleProps) {
  const [activeDay, setActiveDay] = useState("WED");

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 border border-[#1e293b]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-bold">Release Schedule</h3>
        <button className="text-primary text-xs font-bold uppercase hover:text-white transition-colors">
          View Full
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex justify-between mb-6 bg-[#020617] p-1 rounded-lg">
        {days.map((day) => (
          <button
            key={day}
            className={`flex-1 py-1.5 text-[10px] md:text-xs font-medium rounded transition-colors ${
              activeDay === day
                ? "text-white bg-primary shadow-md font-bold"
                : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
            }`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Items */}
      <div className="flex flex-col gap-3">
        {scheduleItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 group cursor-pointer hover:bg-[#1e293b]/50 p-2 rounded-lg transition-colors -mx-2"
          >
            <div className="w-12 text-center pt-1">
              <span
                className={`block font-bold text-sm ${
                  item.isAired ? "text-[#94a3b8]" : "text-white"
                }`}
              >
                {item.time}
              </span>
              <span className="block text-[#94a3b8] text-[10px]">
                {item.timezone}
              </span>
            </div>
            <div
              className={`w-12 h-16 rounded overflow-hidden flex-shrink-0 ${
                item.isAired ? "grayscale opacity-60" : ""
              }`}
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={item.title}
                src={item.poster}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4
                className={`text-sm font-semibold line-clamp-1 ${
                  item.isAired
                    ? "text-[#94a3b8]"
                    : "text-white group-hover:text-primary"
                } transition-colors`}
              >
                {item.title}
              </h4>
              <span className="text-[#94a3b8] text-xs mt-0.5">
                {item.isAired ? "Aired" : item.episode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
