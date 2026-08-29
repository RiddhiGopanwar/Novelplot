const PALETTES = [
  "from-red-soft to-coffee-soft",
  "from-coffee-soft to-red-soft",
  "from-coffee-soft to-parchment",
  "from-red-soft to-parchment",
];

function hashString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export default function BookCover({
  title,
  coverUrl,
  className = "",
}: {
  title: string;
  coverUrl?: string;
  className?: string;
}) {
  if (coverUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={coverUrl}
        alt={`Cover of ${title}`}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const palette = PALETTES[hashString(title) % PALETTES.length];
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${palette} p-3 text-center ${className}`}
    >
      <span className="font-display text-sm italic text-plum/80 line-clamp-4">
        {title}
      </span>
    </div>
  );
}
