export default function StackedBooks() {
  return (
    <div className="relative mx-auto h-64 w-72 sm:h-72 sm:w-80" aria-hidden="true">
      {/* soft glow */}
      <div className="absolute bottom-6 left-1/2 h-28 w-52 -translate-x-1/2 rounded-full bg-red-soft/50 blur-2xl" />

      {/* bottom book, brown, wide, slight tilt */}
      <div className="absolute bottom-6 left-1/2 h-8 w-56 -translate-x-1/2 rotate-[-2deg] rounded-md border-2 border-plum bg-coffee shadow-pop-sm" />

      {/* second book, deep coffee */}
      <div className="absolute bottom-[52px] left-1/2 h-8 w-48 -translate-x-1/2 rotate-[3deg] rounded-md border-2 border-plum bg-coffee-deep shadow-pop-sm" />

      {/* third book, red-soft */}
      <div className="absolute bottom-[92px] left-1/2 h-8 w-52 -translate-x-1/2 rotate-[-4deg] rounded-md border-2 border-plum bg-red shadow-pop-sm" />

      {/* fourth book, cream, slightly open on top */}
      <div className="absolute bottom-[132px] left-1/2 h-9 w-44 -translate-x-1/2 rotate-[2deg] rounded-md border-2 border-plum bg-paper shadow-pop-sm" />

      {/* leaning open book on top */}
      <div className="absolute bottom-[164px] left-1/2 flex h-16 w-40 -translate-x-1/2 -rotate-3 items-end">
        <div className="relative flex h-14 w-full">
          <div className="h-full w-1/2 rounded-l-md border-2 border-r-0 border-plum bg-paper shadow-pop-sm" />
          <div className="h-full w-1/2 rounded-r-md border-2 border-l-0 border-plum bg-paper shadow-pop-sm" />
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-plum" />
        </div>
      </div>

      {/* a couple of small books leaning at the base, for a fuller pile */}
      <div className="absolute bottom-6 left-[22%] h-14 w-5 -translate-x-1/2 rotate-[12deg] rounded-sm border-2 border-plum bg-red-soft shadow-pop-sm" />
      <div className="absolute bottom-6 right-[20%] h-12 w-5 translate-x-1/2 rotate-[-10deg] rounded-sm border-2 border-plum bg-cream shadow-pop-sm" />

      {/* bookmark ribbon accent */}
      <div className="absolute bottom-[178px] left-[46%] h-10 w-4 -rotate-6 rounded-b-sm border-2 border-plum bg-red" />

      {/* sparkles */}
      <span className="absolute left-2 top-4 animate-sparkle text-2xl text-bright-pink">✦</span>
      <span className="absolute right-4 top-10 animate-sparkle text-lg text-bright-pink" style={{ animationDelay: "1s" }}>✦</span>
      <span className="absolute right-10 bottom-2 animate-float text-xl">📕</span>
    </div>
  );
}
