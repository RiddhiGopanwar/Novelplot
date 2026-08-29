import Link from "next/link";
import Footer from "@/components/Footer";
import StackedBooks from "@/components/StackedBooks";

const GENRES = ["Fantasy", "Romance", "Mystery", "Sci-Fi", "Horror", "Historical Fiction"];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-cozy border-2 border-plum bg-coffee px-4 pb-0 pt-10 shadow-pop sm:px-8 sm:pt-14">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-30" />

        {/* subtle literary stickers around the branding */}
        <span className="sticker-jagged left-3 top-3 hidden -rotate-6 bg-red text-cream sm:block">
          EST. FOR
          <br />
          BOOKWORMS
        </span>

        <span className="sticker right-4 top-4 hidden rotate-6 bg-cream text-plum sm:block">
          ☕ cozy &amp; slow
        </span>

        <span className="absolute right-10 top-24 hidden text-2xl text-cream sm:block">
          ♥
        </span>

        <span className="absolute left-10 top-28 hidden animate-sparkle text-xl text-bright-pink sm:block">
          ✦
        </span>

        {/* inset "page" card holding the wordmark */}
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-cozy border-2 border-plum bg-cream px-6 py-10 text-center shadow-pop sm:px-12 sm:py-14">
          <span className="eyebrow">🔖 Every Novel Has a Plot. Find Yours</span>

          <h1 className="font-display text-6xl font-black leading-[0.95] text-plum sm:text-8xl">
            NOVEL
            <br />
            PLOT
          </h1>

          <p className="font-display text-xl italic text-red sm:text-2xl">
            People are like books.
            <br />
            Some deceive you with their cover,
            <br />
            others surprise you with their content.
            <br />— Oscar Wilde
          </p>

          <div className="mt-1 flex flex-wrap justify-center gap-3">
            <Link href="/app" className="btn-primary">
              Start Reading
            </Link>

            <Link
              href="/discover"
              className="inline-flex items-center rounded-full border-2 border-plum bg-transparent px-5 py-2.5 text-sm font-bold text-plum transition-all hover:-translate-y-0.5 hover:bg-coffee-soft/60"
            >
              Explore Books
            </Link>
          </div>
        </div>

        {/* stacked books sitting on the "shelf" panel below the card */}
        <div className="relative -mt-4 flex justify-center pb-2">
          <StackedBooks />
        </div>
      </section>

      {/* About */}
      <section id="about" className="mt-16 flex flex-col gap-5">
        <span className="eyebrow">🕯️ about novel plot</span>

        <h2 className="section-title max-w-xl">
          Every book leaves a story. Novel Plot helps you keep it..
        </h2>

        <p className="max-w-2xl text-plum-soft">
          Novel Plot is your personal space for everything you read, love, and
          discover. Keep track of the books you&rsquo;ve read, build your own
          shelves, save the lines that stay with you, and find your next great
          read. Because your reading journey deserves a place of its own.
        </p>
      </section>

      {/* Discover */}
      <section className="mt-16 rounded-cozy border-2 border-plum bg-coffee px-6 py-12 text-cream sm:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-coffee-soft">🔎 discover</span>

            <h2 className="font-display text-3xl font-black sm:text-4xl">
              A real catalog, not a placeholder shelf.
            </h2>

            <p className="max-w-md text-cream/80">
              Search novels, authors, and genres through a live book
              catalog, then decide for yourself what's worth your time.
            </p>

            <Link href="/discover" className="btn-pill btn-pill-dot mt-1 w-fit">
              Search Books
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {GENRES.map((g) => (
              <Link
                key={g}
                href="/discover"
                className="chip border-cream bg-cream/10 text-cream hover:bg-cream/20"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="mt-16 flex flex-col gap-6">
        <span className="eyebrow">🎧 personalized recommendations</span>

        <h2 className="section-title max-w-xl">
          Some stories give you butterflies. Others leave you emotionally wrecked
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <p className="text-plum-soft">
            Novel Plot is where you keep track of both the books you couldn’t
            put down, the characters you couldn’t forget, and the lines that
            stayed with you long after the last page.
          </p>

          <div className="card relative -rotate-1 bg-red-soft p-8 text-center">
            <span className="sticker -right-3 -top-3 rotate-6 bg-red">
              ✦
            </span>

            <p className="font-display text-2xl font-semibold italic text-plum">
              Novel Plot recommends.
              <br />
              You decide.
            </p>

            <Link
              href="/recommendations"
              className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-wide text-plum underline"
            >
              Browse recommendations →
            </Link>
          </div>
        </div>
      </section>

      {/* Reading / Shelves / Quotes */}
      <section className="mt-16 flex flex-col gap-6">
        <span className="eyebrow">📎 your shelf, your rules</span>

        <h2 className="section-title">
          Reading, shelves, and the lines you keep
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              rot: "-rotate-2",
              bg: "bg-coffee-soft",
              title: "Reading Tracker",
              body: "Track pages and progress, book by book.",
              href: "/library",
            },
            {
              rot: "rotate-1",
              bg: "bg-coffee-soft",
              title: "Custom Shelves",
              body: "Organize your library your own way.",
              href: "/shelves",
            },
            {
              rot: "-rotate-1",
              bg: "bg-red-soft",
              title: "Quotes",
              body: "Save the lines that stay with you.",
              href: "/library",
            },
          ].map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className={`card relative ${f.rot} ${f.bg} p-6 hover:rotate-0`}
            >
              <svg
                className="absolute -top-3 left-6 h-6 w-6 text-plum"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 4v11a3 3 0 0 0 6 0V6a2 2 0 1 0-4 0v9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <h3 className="font-display text-xl font-semibold text-plum">
                {f.title}
              </h3>

              <p className="mt-1 text-sm text-plum-soft">{f.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Subtle community note */}
      <section className="mt-16 flex flex-col items-center gap-2 rounded-cozy border-2 border-dashed border-plum/30 px-6 py-10 text-center">
        <span className="text-2xl">📚</span>

        <p className="max-w-md font-display text-lg italic text-plum-soft">
          Reading is better with company. That's the part of Novel Plot
          we're building next. For the Alex Volkovs, Aaron Warners, and Rhys
          Larsens of your bookshelf. Because some characters stay with you
          long after you close the book. Novel Plot is where you keep the
          stories, moments, and obsessions worth remembering.
        </p>
      </section>

      {/* Final CTA */}
      <section className="paper-grid mt-16 flex flex-col items-center gap-4 rounded-cozy border-2 border-plum bg-paper px-6 py-16 text-center shadow-pop sm:px-12">
        <span className="text-3xl">📖</span>

        <h2 className="font-display text-3xl font-black text-plum sm:text-4xl">
          Your next plot twist is waiting.
        </h2>

        <p className="max-w-md text-plum-soft">
          Save the stories you’re dying to read, meet characters you’ll never
          forget, and let Novel Plot track every chapter.
        </p>

        <Link href="/app" className="btn-pill btn-pill-dot mt-2">
          Start Reading
        </Link>
      </section>

      <Footer />
    </div>
  );
}