"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Book } from "@/lib/types";
import { ensureSeeded, getBooks, updateBookProgress } from "@/lib/storage";
import BookCard from "@/components/BookCard";
import ProgressBar from "@/components/ProgressBar";
import EmptyState from "@/components/EmptyState";
import { MOODS, MOOD_RECOMMENDATIONS } from "@/lib/moods";
import { Mood } from "@/lib/types";
import FloatingShelf from "@/components/FloatingShelf";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Still up reading?";
  if (hour < 12) return "Good morning, reader";
  if (hour < 18) return "Good afternoon, reader";
  return "Good evening, reader";
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [mood, setMood] = useState<Mood | null>(null);

  useEffect(() => {
    ensureSeeded();
    refresh();
  }, []);

  const currentlyReading = books.filter((b) => b.status === "currently-reading");
  const recentlyCompleted = useMemo(
    () =>
      books
        .filter((b) => b.status === "completed")
        .sort(
          (a, b) =>
            new Date(b.dateCompleted || 0).getTime() -
            new Date(a.dateCompleted || 0).getTime()
        )
        .slice(0, 3),
    [books]
  );
  const wantToRead = books.filter((b) => b.status === "want-to-read").slice(0, 3);

  const stats = {
    reading: currentlyReading.length,
    completed: books.filter((b) => b.status === "completed").length,
    pages: books
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.totalPages, 0),
  };

  async function handleProgress(id: string, page: number) {
    await updateBookProgress(id, page);
    refresh();
  }

  function refresh() {
    getBooks().then(setBooks);
  }

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="paper-grid relative overflow-hidden rounded-cozy border-2 border-plum bg-paper px-6 py-14 shadow-pop sm:px-12 sm:py-16">
        <span className="sticker left-6 top-6 hidden -rotate-6 bg-red-soft sm:block">
          🔖 where stories get organized
        </span>
        <span className="absolute right-8 top-8 hidden text-3xl sm:block">🍒</span>

        <div className="relative mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_1fr] md:mt-10">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">📖 {greeting()}</span>
            <h1 className="max-w-xl font-display text-4xl font-black leading-[1.05] text-plum sm:text-6xl">
              <span className="mark-red">your next chapter</span>
              <br />
              <span className="font-display italic font-normal">starts on this shelf.</span>
            </h1>
            <p className="max-w-lg text-plum-soft">
              Track what you're reading, save the lines that stay with you, and let
              The Novel Plot remember your shelves so you don't have to.
            </p>
            {currentlyReading[0] ? (
              <Link href="/library" className="btn-pill btn-pill-dot mt-2 w-fit">
                Continue reading {currentlyReading[0].title}
              </Link>
            ) : (
              <Link href="/discover" className="btn-pill btn-pill-dot mt-2 w-fit">
                Find your next book
              </Link>
            )}
          </div>
          <FloatingShelf />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="card bg-red-soft p-5 text-center">
          <div className="font-display text-3xl font-bold text-plum">{stats.reading}</div>
          <div className="font-mono text-xs uppercase tracking-wide text-plum-soft">Currently reading</div>
        </div>
        <div className="card bg-red-soft p-5 text-center">
          <div className="font-display text-3xl font-bold text-plum">{stats.completed}</div>
          <div className="font-mono text-xs uppercase tracking-wide text-plum-soft">Books completed</div>
        </div>
        <div className="card col-span-2 bg-coffee-soft p-5 text-center sm:col-span-1">
          <div className="font-display text-3xl font-bold text-plum">{stats.pages.toLocaleString()}</div>
          <div className="font-mono text-xs uppercase tracking-wide text-plum-soft">Pages finished</div>
        </div>
      </section>

      {/* Currently reading */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow">⚡ your nightstand</span>
            <h2 className="section-title">Currently Reading</h2>
          </div>
          <Link href="/library" className="font-mono text-xs font-bold uppercase tracking-wide text-plum-soft hover:text-plum">
            View library →
          </Link>
        </div>
        {currentlyReading.length === 0 ? (
          <EmptyState
            emoji="📖"
            title="Nothing on your nightstand yet"
            description="Add a book from Discover to start tracking your progress."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentlyReading.map((book) => (
              <BookCard key={book.id} book={book} onUpdateProgress={handleProgress} onChanged={refresh} />
            ))}
          </div>
        )}
      </section>

      {/* Recently completed */}
      {recentlyCompleted.length > 0 && (
        <section className="flex flex-col gap-4">
          <span className="eyebrow">✨ freshly finished</span>
          <h2 className="section-title -mt-2">Recently Completed</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyCompleted.map((book) => (
              <BookCard key={book.id} book={book} onChanged={refresh} />
            ))}
          </div>
        </section>
      )}

      {/* Want to read / recommended */}
      {wantToRead.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">🗺️ on the horizon</span>
              <h2 className="section-title">Up Next</h2>
            </div>
            <Link href="/discover" className="font-mono text-xs font-bold uppercase tracking-wide text-plum-soft hover:text-plum">
              Discover more →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wantToRead.map((book) => (
              <BookCard key={book.id} book={book} onChanged={refresh} />
            ))}
          </div>
        </section>
      )}

      {/* Mood recommendations */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow">🎧 mood picks</span>
            <h2 className="section-title">What's your mood today?</h2>
            <p className="text-sm text-plum-soft">
              Pick a feeling and we'll pull a few books that fit it.
            </p>
          </div>
          <Link href="/recommendations" className="font-mono text-xs font-bold uppercase tracking-wide text-plum-soft hover:text-plum">
            Browse all →
          </Link>
        </div>
        <div className="card relative flex flex-col gap-5 bg-paper p-6">
          <span className="sticker -right-3 -top-3 hidden rotate-6 bg-red text-plum sm:block">✦</span>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`chip transition-all ${
                  mood === m.id
                    ? "bg-red-soft text-plum shadow-pop-sm"
                    : "bg-paper text-plum-soft hover:bg-red-soft/40 hover:text-plum"
                }`}
              >
                <span>{m.emoji}</span>
                {m.label}
              </button>
            ))}
          </div>

          {mood && (
            <div className="grid grid-cols-1 gap-4 border-t-2 border-dashed border-plum/20 pt-5 sm:grid-cols-3">
              {MOOD_RECOMMENDATIONS[mood].map((rec) => (
                <Link
                  key={rec.title}
                  href={`/discover?q=${encodeURIComponent(`${rec.title} ${rec.author}`)}`}
                  className="rounded-2xl border-2 border-plum/15 bg-cream p-4 transition-transform hover:-translate-y-1"
                >
                  <p className="font-display text-base font-semibold text-plum">{rec.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-plum-soft">{rec.author} · {rec.genre}</p>
                  <p className="mt-2 text-sm text-plum-soft">{rec.blurb}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
