"use client";

import { useState } from "react";
import Link from "next/link";
import { Book } from "@/lib/types";
import BookCover from "./BookCover";
import ProgressBar from "./ProgressBar";
import ConfirmDialog from "./ConfirmDialog";
import { deleteBook, updateBookRating } from "@/lib/storage";
import { showToast } from "@/lib/toast";

const STATUS_LABEL: Record<Book["status"], string> = {
  "currently-reading": "Currently Reading",
  "want-to-read": "Want to Read",
  completed: "Completed",
};

const STATUS_COLOR: Record<Book["status"], string> = {
  "currently-reading": "bg-coffee-soft text-plum",
  "want-to-read": "bg-red-soft text-plum",
  completed: "bg-coffee-soft text-plum",
};

const NEXT_LABEL: Record<Book["status"], string> = {
  "want-to-read": "Start reading →",
  "currently-reading": "Mark completed →",
  completed: "Completed",
};

export default function BookCard({
  book,
  onUpdateProgress,
  onCycleStatus,
  onChanged,
}: {
  book: Book;
  onUpdateProgress?: (id: string, page: number) => void;
  onCycleStatus?: (id: string) => void;
  onChanged?: () => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const pct = book.totalPages > 0 ? (book.currentPage / book.totalPages) * 100 : 0;

  async function handleDelete() {
    await deleteBook(book.id);
    setConfirmOpen(false);
    showToast(`Removed "${book.title}"`, "success");
    onChanged?.();
  }

  async function handleRate(rating: number) {
    await updateBookRating(book.id, rating);
    onChanged?.();
  }

  function clampAndUpdate(value: number) {
    if (!onUpdateProgress) return;
    if (Number.isNaN(value)) return;
    const clamped = Math.max(0, Math.min(value, book.totalPages || value));
    onUpdateProgress(book.id, clamped);
  }

  return (
    <div className="card flex flex-col overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative h-44 w-full">
        <Link href={`/book/${book.id}`}>
          <BookCover title={book.title} coverUrl={book.coverUrl} />
        </Link>
        <span className={`chip absolute right-3 top-3 ${STATUS_COLOR[book.status]}`}>
          {STATUS_LABEL[book.status]}
        </span>
        <button
          onClick={() => setConfirmOpen(true)}
          aria-label={`Delete ${book.title}`}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-plum-soft shadow-pop-sm border-2 border-plum transition-colors hover:bg-red hover:text-plum"
        >
          🗑
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/book/${book.id}`}>
          <h3 className="font-display text-lg leading-snug text-plum hover:underline">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-plum-soft">{book.author}</p>

        {book.status === "completed" && (
          <div className="flex gap-0.5 text-lg leading-none" aria-label="Rate this book">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handleRate(n)}
                aria-label={`Rate ${n} of 5`}
                className={n <= (book.rating || 0) ? "text-red" : "text-red-deep/50"}
              >
                ★
              </button>
            ))}
          </div>
        )}

        {book.status === "currently-reading" && (
          <div className="mt-1 flex flex-col gap-1.5">
            <ProgressBar value={pct} />
            <div className="flex items-center justify-between gap-2 text-xs text-plum-soft">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={book.totalPages}
                  value={book.currentPage}
                  onChange={(e) => clampAndUpdate(Number(e.target.value))}
                  className="w-14 rounded-md border-2 border-plum/15 bg-paper px-1.5 py-0.5 text-xs text-plum outline-none focus:border-red-deep"
                />
                <span>/ {book.totalPages} pages</span>
              </div>
              <span>{Math.round(pct)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={book.totalPages || 1}
              value={book.currentPage}
              onChange={(e) => clampAndUpdate(Number(e.target.value))}
              className="mt-1 w-full accent-red-deep"
            />
          </div>
        )}

        {onCycleStatus && (
          <button
            onClick={() => onCycleStatus(book.id)}
            className="mt-auto self-start rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-plum shadow-sm transition-colors hover:bg-red-soft"
          >
            {NEXT_LABEL[book.status]}
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Remove this book?"
        description={`"${book.title}" will be permanently removed from your library and any shelves.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
