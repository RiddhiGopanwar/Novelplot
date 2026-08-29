"use client";

import { useEffect, useState, type FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GoogleBookResult, searchBooks } from "@/lib/googleBooks";
import { getBooks, upsertBook } from "@/lib/storage";
import BookCover from "@/components/BookCover";
import EmptyState from "@/components/EmptyState";
import { ReadingStatus } from "@/lib/types";
import { useAuth } from "@/lib/AuthContext";
import { showToast } from "@/lib/toast";

function DiscoverInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GoogleBookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  async function runSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await searchBooks(q);
      setResults(res);
    } catch {
      setError(
        "Couldn't reach Google Books right now. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    await runSearch(query);
  }

  // Lets recommendation cards (or any other page) deep-link straight into a
  // search for one exact book via /discover?q=... without touching the
  // search logic itself.
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      runSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function addToLibrary(book: GoogleBookResult, status: ReadingStatus) {
    if (!user) {
      showToast("Log in to add books to your library", "error");
      router.push(`/login?next=/discover`);
      return;
    }
    const existing = (await getBooks()).find(
      (b) => b.title === book.title && b.author === book.author
    );
    await upsertBook({
      id: existing?.id || `gb_${book.id}`,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      status,
      currentPage: 0,
      totalPages: book.pageCount || 300,
      genre: book.genre,
      dateAdded: new Date().toISOString(),
    });
    setAddedIds((prev) => new Set(prev).add(book.id));
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="eyebrow">🔎 find something new</span>
        <h1 className="font-display text-3xl font-bold text-plum">Discover</h1>
        <p className="text-sm text-plum-soft">
          Search for your next read, powered by Google Books.
        </p>
      </div>

      <form onSubmit={handleSearch} className="card flex flex-col gap-3 p-4 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or genre..."
          className="flex-1 rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-plum px-6 py-3 text-sm font-semibold text-cream shadow-pop-sm disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="card border-red/50 p-4 text-sm text-plum-soft">{error}</div>
      )}

      {!loading && results.length === 0 && !error && (
        <EmptyState
          emoji="🔎"
          title="Search for a book to begin"
          description="Try an author, a title, or even a genre like 'cozy fantasy'."
        />
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((book) => (
          <div key={book.id} className="card flex flex-col overflow-hidden">
            <div className="h-48 w-full">
              <BookCover title={book.title} coverUrl={book.coverUrl} />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-display text-base leading-snug text-plum">
                {book.title}
              </h3>
              <p className="text-sm text-plum-soft">{book.author}</p>
              {book.description && (
                <p className="line-clamp-3 text-xs text-plum-soft">{book.description}</p>
              )}

              {addedIds.has(book.id) ? (
                <span className="mt-auto w-fit rounded-full bg-coffee-soft px-3 py-1.5 text-xs font-semibold text-plum">
                  Added ✓
                </span>
              ) : (
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => addToLibrary(book, "want-to-read")}
                    className="rounded-full bg-red-soft px-3 py-1.5 text-xs font-semibold text-plum hover:bg-red-deep"
                  >
                    Want to Read
                  </button>
                  <button
                    onClick={() => addToLibrary(book, "currently-reading")}
                    className="rounded-full bg-coffee-soft px-3 py-1.5 text-xs font-semibold text-plum hover:bg-coffee"
                  >
                    Start Reading
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={null}>
      <DiscoverInner />
    </Suspense>
  );
}
