const ITEMS = [
  "COZY READING",
  "TRACK YOUR SHELVES",
  "SAVE YOUR FAVOURITE LINES",
  "MOOD-BASED PICKS",
  "YOUR READING WRAPPED",
];

export default function Marquee() {
  const line = ITEMS.join("   ·   ");
  return (
    <div
      className="overflow-hidden border-y-2 border-plum bg-coffee-soft py-2"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee font-mono text-xs font-bold uppercase tracking-widest text-plum">
        <span className="px-4">{line}   ·   {line}</span>
        <span className="px-4">{line}   ·   {line}</span>
      </div>
    </div>
  );
}
