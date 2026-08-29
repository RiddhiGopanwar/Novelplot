const SPINES = [
  { h: 108, color: "bg-red/80", tilt: "-rotate-2" },
  { h: 130, color: "bg-plum/80", tilt: "rotate-1" },
  { h: 92, color: "bg-coffee/80", tilt: "-rotate-1" },
  { h: 122, color: "bg-coffee-deep/80", tilt: "rotate-2" },
  { h: 100, color: "bg-plum/70", tilt: "-rotate-1" },
  { h: 116, color: "bg-red-deep/70", tilt: "rotate-1" },
];

export default function FloatingShelf() {
  return (
    <div
      className="relative mx-auto flex h-56 w-64 items-end justify-center animate-float"
      aria-hidden="true"
    >
      {/* soft glow behind the stack */}
      <div className="absolute bottom-6 h-28 w-48 rounded-full bg-white/40 blur-2xl" />

      {/* book spines */}
      <div className="relative z-10 flex items-end gap-1.5">
        {SPINES.map((s, i) => (
          <div
            key={i}
            className={`w-6 rounded-sm ${s.color} ${s.tilt} shadow-md`}
            style={{ height: s.h }}
          />
        ))}
      </div>

      {/* shelf base */}
      <div className="absolute bottom-3 h-3 w-56 rounded-full bg-plum/30" />

      {/* a book floating open above, mid-read */}
      <div className="absolute -top-2 right-2 animate-drift">
        <div className="relative h-10 w-16 rounded-sm bg-white/90 shadow-soft">
          <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-plum/20" />
        </div>
      </div>

      {/* a sparkle */}
      <span className="absolute -left-4 top-6 animate-sparkle text-lg text-red">✦</span>
      <span className="absolute -right-6 top-16 animate-sparkle text-sm text-red-deep" style={{ animationDelay: "1s" }}>
        ✦
      </span>
    </div>
  );
}
