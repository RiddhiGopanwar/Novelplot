"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Book, ReadingStatus, Shelf } from "@/lib/types";
import {
  deleteBook,
  ensureSeeded,
  getBooks,
  getShelves,
  toggleBookOnShelf,
  upsertBook,
} from "@/lib/storage";
import { showToast } from "@/lib/toast";
import BookCover from "@/components/BookCover";
import ProgressBar from "@/components/ProgressBar";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";

const STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: "want-to-read", label: "Want to Read" },
  { value: "currently-reading", label: "Currently Reading" },
  { value: "completed", label: "Completed" },
];

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [books, setBooks] = useState<Book[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<{
    title: string;
    author: string;
    genre: string;
    status: ReadingStatus;
    currentPage: string;
    totalPages: string;
    rating: number;
    notes: string;
  } | null>(null);

  useEffect(() => {
    ensureSeeded();
    getBooks().then(setBooks);
    getShelves().then(setShelves);
  }, []);

  const book = useMemo(() => books.find((b) => b.id === id), [books, id]);

  useEffect(() => {
    if (book && !form) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre || "",
        status: book.status,
        currentPage: String(book.currentPage),
        totalPages: String(book.totalPages),
        rating: book.rating || 0,
        notes: book.notes || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  if (!id || (books.length > 0 && !book)) {
    return (
      <div className="flex flex-col gap-6">
        <EmptyState
          emoji="📕"
          title="Book not found"
          description="This book may have already been removed from your library."
        />
        <Link href="/library" className="w-fit text-sm font-semibold text-plum-soft hover:text-plum">
          ← Back to My Library
        </Link>
      </div>
    );
  }

  if (!book || !form) return null;

  async function handleSave() {
    if (!form || !book) return;
    const totalPages = Math.max(1, Number(form.totalPages) || 1);
    const currentPage = Math.max(0, Math.min(Number(form.currentPage) || 0, totalPages));
    const isNowComplete = currentPage >= totalPages;

    const updated: Book = {
      ...book,
      title: form.title.trim() || book.title,
      author: form.author.trim() || book.author,
      genre: form.genre.trim() || undefined,
      status: isNowComplete ? "completed" : form.status,
      currentPage,
      totalPages,
      rating: form.rating > 0 ? form.rating : undefined,
      notes: form.notes.trim() || undefined,
      dateCompleted:
        isNowComplete && !book.dateCompleted ? new Date().toISOString() : book.dateCompleted,
    };
    await upsertBook(updated);
    setBooks(await getBooks());
    setSaved(true);
    showToast("Book updated", "success");
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete() {
    if (!book) return;
    await deleteBook(book.id);
    showToast(`Removed "${book.title}"`, "success");
    router.push("/library");
  }

  function handleStatusQuickChange(status: ReadingStatus) {
    if (!form) return;
    setForm({ ...form, status });
  }

  return (
    <div className="flex flex-col gap-8">
      <Link href="/library" className="w-fit text-sm font-semibold text-plum-soft hover:text-plum">
        ← Back to My Library
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4">
          <div className="card h-80 w-full overflow-hidden">
            <BookCover title={book.title} coverUrl={book.coverUrl} />
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            className="w-full rounded-full bg-red px-4 py-2.5 text-sm font-semibold text-plum shadow-sm hover:opacity-90"
          >
            Delete book
          </button>
        </div>

        <div className="card flex flex-col gap-6 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-plum-soft">Title</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-plum outline-none focus:border-red-deep"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-plum-soft">Author</span>
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-plum outline-none focus:border-red-deep"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-plum-soft">Genre</span>
              <input
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-plum outline-none focus:border-red-deep"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-plum-soft">Reading status</span>
              <select
                value={form.status}
                onChange={(e) => handleStatusQuickChange(e.target.value as ReadingStatus)}
                className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-plum outline-none focus:border-red-deep"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-plum-soft">Pages read</span>
                <input
                  type="number"
                  min={0}
                  value={form.currentPage}
                  onChange={(e) => setForm({ ...form, currentPage: e.target.value })}
                  className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-plum outline-none focus:border-red-deep"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-plum-soft">Total pages</span>
                <input
                  type="number"
                  min={1}
                  value={form.totalPages}
                  onChange={(e) => setForm({ ...form, totalPages: e.target.value })}
                  className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-plum outline-none focus:border-red-deep"
                />
              </label>
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-plum-soft">Progress</span>
                <div className="flex h-full flex-col justify-center gap-1">
                  <ProgressBar
                    value={
                      (Math.min(Number(form.currentPage) || 0, Number(form.totalPages) || 1) /
                        Math.max(1, Number(form.totalPages) || 1)) *
                      100
                    }
                  />
                  <span className="text-xs text-plum-soft">
                    {Math.round(
                      (Math.min(Number(form.currentPage) || 0, Number(form.totalPages) || 1) /
                        Math.max(1, Number(form.totalPages) || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-plum-soft/80">
              Reaching total pages automatically marks this book as Completed.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-plum-soft">Rating</span>
            <div className="flex gap-1 text-2xl leading-none">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setForm({ ...form, rating: form.rating === n ? 0 : n })}
                  className={n <= form.rating ? "text-red" : "text-red-deep/40"}
                  aria-label={`Rate ${n} of 5`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-semibold text-plum-soft">Notes</span>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Personal notes about this book..."
              className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-plum-soft">Shelves</span>
            {shelves.length === 0 ? (
              <p className="text-sm text-plum-soft">
                You don't have any shelves yet.{" "}
                <Link href="/shelves" className="underline">
                  Create one
                </Link>
                .
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {shelves.map((s) => {
                  const active = s.bookIds.includes(book.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        toggleBookOnShelf(s.id, book.id).then(() => {
                          getShelves().then(setShelves);
                        });
                      }}
                      className={`chip ${
                        active
                          ? "bg-red-soft text-plum shadow-pop-sm"
                          : "bg-paper text-plum-soft hover:bg-red-soft/40 hover:text-plum"
                      }`}
                    >
                      <span>{s.emoji}</span>
                      {s.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="rounded-full bg-plum px-6 py-2.5 text-sm font-semibold text-cream shadow-pop-sm transition-transform hover:-translate-y-0.5"
            >
              Save changes
            </button>
            {saved && <span className="text-sm font-semibold text-coffee">✓ Saved</span>}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this book?"
        description={`"${book.title}" will be permanently removed from your library and any shelves.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
