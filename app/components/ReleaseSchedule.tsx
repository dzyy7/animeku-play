"use client";

import { ScheduleDay } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

interface ReleaseScheduleProps {
  scheduleData: ScheduleDay[];
}

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const dayMap: Record<string, string> = {
  "Senin": "MON",
  "Selasa": "TUE",
  "Rabu": "WED",
  "Kamis": "THU",
  "Jumat": "FRI",
  "Sabtu": "SAT",
  "Minggu": "SUN"
};

export default function ReleaseSchedule({ scheduleData }: ReleaseScheduleProps) {
  // Determine current day to set as active default
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long" });
  const [activeDay, setActiveDay] = useState(today);

  // Find the selected day's data
  const currentDayData = scheduleData.find(d => d.day === activeDay)?.anime_list || [];

  return (
    <div className="bg-[#1e293b] rounded-xl p-5 border border-[#1e293b]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-bold">Release Schedule</h3>
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
            {dayMap[day]}
          </button>
        ))}
      </div>

      {/* Schedule Items - Scrollable Box */}
      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {currentDayData.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className="flex gap-3 group cursor-pointer hover:bg-[#1e293b]/50 p-2 rounded-lg transition-colors -mx-2"
          >
            <div
              className={`w-12 h-16 rounded overflow-hidden flex-shrink-0`}
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={item.title}
                src={item.poster}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4
                className={`text-sm font-semibold line-clamp-2 text-white group-hover:text-primary transition-colors`}
              >
                {item.title}
              </h4>
            </div>
          </Link>
        ))}
        {currentDayData.length === 0 && (
          <div className="text-center text-[#94a3b8] py-8 text-sm">
             No schedule for this day.
          </div>
        )}
      </div>
    </div>
  );
}
