"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Book, Shelf } from "@/lib/types";
import { ensureSeeded, getBooks, getShelves } from "@/lib/storage";
import StatCard from "@/components/StatCard";
import EmptyState from "@/components/EmptyState";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function WrappedPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);

  useEffect(() => {
    ensureSeeded();
    getBooks().then(setBooks);
    getShelves().then(setShelves);
  }, []);

  const completed = books.filter((b) => b.status === "completed");

  const stats = useMemo(() => {
    const pages = completed.reduce((sum, b) => sum + b.totalPages, 0);

    const genreCounts: Record<string, number> = {};
    const authorCounts: Record<string, number> = {};
    const monthCounts: Record<number, number> = {};

    for (const b of completed) {
      const genre = b.genre || "Uncategorized";
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      authorCounts[b.author] = (authorCounts[b.author] || 0) + 1;
      if (b.dateCompleted) {
        const m = new Date(b.dateCompleted).getMonth();
        monthCounts[m] = (monthCounts[m] || 0) + 1;
      }
    }

    const favouriteGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const mostReadAuthor = Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const highestRated = [...completed].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
    const favouriteShelf = [...shelves].sort((a, b) => b.bookIds.length - a.bookIds.length)[0];

    // streak: consecutive months with at least one completion, ending this month
    let streak = 0;
    const now = new Date().getMonth();
    for (let i = 0; i < 12; i++) {
      const m = (now - i + 12) % 12;
      if (monthCounts[m]) streak++;
      else break;
    }

    return {
      pages,
      favouriteGenre,
      mostReadAuthor,
      highestRated,
      favouriteShelf,
      streak,
      monthCounts,
    };
  }, [completed, shelves]);

  if (completed.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <span className="eyebrow">✨ your year in books</span>
        <h1 className="font-display text-3xl font-bold text-plum">Reading Wrapped</h1>
        <EmptyState
          emoji="🎉"
          title="Your Wrapped is waiting"
          description="Finish your first book to unlock your personal reading summary."
        />
      </div>
    );
  }

  const maxMonth = Math.max(1, ...Object.values(stats.monthCounts));

  return (
    <div className="flex flex-col gap-10">
      <section className="paper-grid relative overflow-hidden rounded-cozy border-2 border-plum bg-plum px-6 py-14 text-cream shadow-pop sm:px-12">
        <div className="absolute -right-8 top-8 h-32 w-32 animate-float rounded-full bg-red/20 blur-2xl" />
        <div className="absolute bottom-4 left-8 h-24 w-24 animate-drift rounded-full bg-red-deep/20 blur-2xl" />
        <span className="relative eyebrow text-red">✨ your reading, wrapped</span>
        <h1 className="relative mt-3 font-display text-4xl font-black sm:text-5xl">
          You read {completed.length} {completed.length === 1 ? "book" : "books"} this year.
        </h1>
        <p className="relative mt-3 max-w-lg text-cream/80">
          That's {stats.pages.toLocaleString()} pages of someone else's world, folded into
          yours. Here's your year in reading.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard emoji="📚" label="Books completed" value={completed.length} />
        <StatCard emoji="📄" label="Pages read" value={stats.pages.toLocaleString()} />
        <StatCard emoji="🔥" label="Month streak" value={stats.streak} />
        <StatCard emoji="🗂️" label="Favourite shelf" value={stats.favouriteShelf?.name || "None yet"} />
      </section>

      <section className="card flex flex-col gap-4 p-6">
        <h2 className="section-title">Monthly Activity</h2>
        <div className="flex items-end gap-2 overflow-x-auto pb-2">
          {MONTH_LABELS.map((label, i) => {
            const count = stats.monthCounts[i] || 0;
            const height = Math.max(6, (count / maxMonth) * 90);
            return (
              <div key={label} className="flex w-9 flex-shrink-0 flex-col items-center gap-1.5">
                <div className="flex h-24 w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-red-deep to-red transition-all"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] text-plum-soft">{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="card p-6">
          <p className="text-sm text-plum-soft">Favourite genre</p>
          <p className="font-display text-2xl text-plum">{stats.favouriteGenre}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-plum-soft">Most-read author</p>
          <p className="font-display text-2xl text-plum">{stats.mostReadAuthor}</p>
        </div>
        {stats.highestRated && (
          <div className="card p-6 sm:col-span-2">
            <p className="text-sm text-plum-soft">Highest rated book</p>
            <p className="font-display text-2xl text-plum">{stats.highestRated.title}</p>
            <p className="text-sm text-red">{"★".repeat(stats.highestRated.rating || 0)}</p>
          </div>
        )}
      </section>

      <section className="card flex flex-col items-center gap-3 p-10 text-center">
        <span className="text-3xl">🔮</span>
        <p className="text-sm text-plum-soft">Curious what kind of reader you are?</p>
        <Link href="/personality" className="btn-pill btn-pill-dot">
          Take the Reading Personality Quiz
        </Link>
      </section>
    </div>
  );
}
