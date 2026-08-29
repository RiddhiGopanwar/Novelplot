"use client";

const SPARKLES = [
  { top: "8%", left: "6%", size: 10, delay: "0s" },
  { top: "18%", left: "92%", size: 14, delay: "0.6s" },
  { top: "42%", left: "3%", size: 8, delay: "1.2s" },
  { top: "70%", left: "95%", size: 12, delay: "0.3s" },
  { top: "88%", left: "10%", size: 9, delay: "1.6s" },
  { top: "55%", left: "50%", size: 7, delay: "2s" },
];

export default function SparkleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute animate-sparkle text-bright-pink"
          style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
