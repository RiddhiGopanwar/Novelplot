import Link from "next/link";
import { RECOMMENDATION_CATEGORIES } from "@/lib/recommendations";

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="eyebrow">✨ personalized recommendations</span>
        <h1 className="font-display text-3xl font-bold text-plum">Recommended For You</h1>
        <p className="max-w-xl text-sm text-plum-soft">
          Browse by mood or genre. Tapping a book opens it in Discover, where
          you can read more and decide for yourself whether to add it.
          Nothing here is ever added to your library automatically.
        </p>
      </div>

      {RECOMMENDATION_CATEGORIES.map((cat) => (
        <section key={cat.id} className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold text-plum">
            {cat.emoji} {cat.label}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {cat.books.map((book) => (
              <Link
                key={book.title}
                href={`/discover?q=${encodeURIComponent(`${book.title} ${book.author}`)}`}
                className="card flex w-44 flex-shrink-0 flex-col gap-1 p-4 hover:-translate-y-1"
              >
                <span className="font-display text-base leading-snug text-plum">
                  {book.title}
                </span>
                <span className="text-xs text-plum-soft">{book.author}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
