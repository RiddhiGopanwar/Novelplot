"use client";

import { MOODS } from "@/lib/moods";
import { Mood } from "@/lib/types";

export default function MoodSelector({
  selected,
  onSelect,
}: {
  selected: Mood | null;
  onSelect: (mood: Mood) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onSelect(mood.id)}
          className={`chip transition-all ${
            selected === mood.id
              ? "bg-red-soft text-plum shadow-pop-sm scale-105"
              : "bg-paper text-plum-soft hover:bg-red-soft/40 hover:text-plum"
          }`}
        >
          <span>{mood.emoji}</span>
          {mood.label}
        </button>
      ))}
    </div>
  );
}
