"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Book, Quote, ReadingStatus } from "@/lib/types";
import {
  addQuote,
  deleteQuote,
  ensureSeeded,
  getBooks,
  getQuotes,
  updateBookProgress,
  updateBookStatus,
  updateQuote,
} from "@/lib/storage";
import { showToast } from "@/lib/toast";
import BookCard from "@/components/BookCard";
import QuoteCard from "@/components/QuoteCard";
import EmptyState from "@/components/EmptyState";

type Tab = ReadingStatus | "quotes";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "currently-reading", label: "Currently Reading", emoji: "📖" },
  { id: "want-to-read", label: "Want to Read", emoji: "🌙" },
  { id: "completed", label: "Completed", emoji: "✨" },
  { id: "quotes", label: "Quotes", emoji: "💬" },
];

const NEXT_STATUS: Record<ReadingStatus, ReadingStatus> = {
  "want-to-read": "currently-reading",
  "currently-reading": "completed",
  completed: "completed",
};

function emptyQuoteForm() {
  return { text: "", book: "", author: "", page: "" };
}

export default function LibraryPage() {
  const [tab, setTab] = useState<Tab>("currently-reading");
  const [books, setBooks] = useState<Book[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [search, setSearch] = useState("");

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState(emptyQuoteForm());
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyQuoteForm());

  useEffect(() => {
    ensureSeeded();
    refreshBooks();
    refreshQuotes();
  }, []);

  function refreshBooks() {
    getBooks().then(setBooks);
  }
  function refreshQuotes() {
    getQuotes().then(setQuotes);
  }

  async function handleProgress(id: string, page: number) {
    const before = books.find((b) => b.id === id);
    const updated = await updateBookProgress(id, page);
    refreshBooks();
    if (before && updated && before.status !== "completed" && updated.status === "completed") {
      showToast(`"${updated.title}" marked as completed! 🎉`, "success");
    }
  }

  async function handleCycleStatus(id: string) {
    const book = books.find((b) => b.id === id);
    if (!book) return;
    await updateBookStatus(id, NEXT_STATUS[book.status]);
    refreshBooks();
    showToast("Reading status updated", "success");
  }

  async function submitQuote(e: FormEvent) {
    e.preventDefault();
    if (!quoteForm.text.trim() || !quoteForm.book.trim()) return;
    await addQuote({
      id: `q_${Date.now()}`,
      text: quoteForm.text.trim(),
      book: quoteForm.book.trim(),
      author: quoteForm.author.trim() || "Unknown",
      page: quoteForm.page ? Number(quoteForm.page) : undefined,
      dateAdded: new Date().toISOString(),
    });
    refreshQuotes();
    setQuoteForm(emptyQuoteForm());
    setShowQuoteForm(false);
    showToast("Quote saved", "success");
  }

  function startEditQuote(q: Quote) {
    setEditingQuoteId(q.id);
    setEditForm({
      text: q.text,
      book: q.book,
      author: q.author,
      page: q.page ? String(q.page) : "",
    });
  }

  async function saveEditQuote(e: FormEvent) {
    e.preventDefault();
    if (!editingQuoteId) return;
    if (!editForm.text.trim() || !editForm.book.trim()) return;
    await updateQuote({
      id: editingQuoteId,
      text: editForm.text.trim(),
      book: editForm.book.trim(),
      author: editForm.author.trim() || "Unknown",
      page: editForm.page ? Number(editForm.page) : undefined,
      dateAdded: quotes.find((q) => q.id === editingQuoteId)?.dateAdded || new Date().toISOString(),
    });
    refreshQuotes();
    setEditingQuoteId(null);
    showToast("Quote updated", "success");
  }

  const filteredBooks = useMemo(() => {
    const inTab = books.filter((b) => b.status === tab);
    if (!search.trim()) return inTab;
    const q = search.trim().toLowerCase();
    return inTab.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, tab, search]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="eyebrow">📚 your collection</span>
        <h1 className="font-display text-3xl font-bold text-plum">My Library</h1>
        <p className="text-sm text-plum-soft">Every book and every line you've kept.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`chip ${
                tab === t.id
                  ? "bg-red-soft text-plum shadow-pop-sm"
                  : "bg-paper text-plum-soft hover:bg-red-soft/40 hover:text-plum"
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        {tab !== "quotes" && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title or author..."
            className="w-full rounded-full border-2 border-plum/15 bg-paper px-4 py-2 text-sm text-plum outline-none focus:border-red-deep sm:w-64"
          />
        )}
      </div>

      {tab !== "quotes" ? (
        filteredBooks.length === 0 ? (
          <EmptyState
            emoji="🍂"
            title={search ? "No books match your search" : "Nothing here yet"}
            description={
              search
                ? "Try a different title or author."
                : "Books you add from Discover will show up in this shelf."
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onUpdateProgress={tab === "currently-reading" ? handleProgress : undefined}
                onCycleStatus={tab !== "completed" ? handleCycleStatus : undefined}
                onChanged={refreshBooks}
              />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-5">
          <button
            onClick={() => setShowQuoteForm((s) => !s)}
            className="w-fit rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-cream shadow-pop-sm"
          >
            {showQuoteForm ? "Cancel" : "+ Save a quote"}
          </button>

          {showQuoteForm && (
            <form onSubmit={submitQuote} className="card flex flex-col gap-3 p-6">
              <textarea
                required
                placeholder="The line that stayed with you..."
                value={quoteForm.text}
                onChange={(e) => setQuoteForm({ ...quoteForm, text: e.target.value })}
                className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                rows={3}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  required
                  placeholder="Book title"
                  value={quoteForm.book}
                  onChange={(e) => setQuoteForm({ ...quoteForm, book: e.target.value })}
                  className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                />
                <input
                  placeholder="Author"
                  value={quoteForm.author}
                  onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                  className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                />
                <input
                  placeholder="Page (optional)"
                  type="number"
                  min={0}
                  value={quoteForm.page}
                  onChange={(e) => setQuoteForm({ ...quoteForm, page: e.target.value })}
                  className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                />
              </div>
              <button
                type="submit"
                className="w-fit rounded-full bg-red-deep px-5 py-2 text-sm font-semibold text-plum"
              >
                Save quote
              </button>
            </form>
          )}

          {quotes.length === 0 ? (
            <EmptyState
              emoji="💬"
              title="No quotes saved yet"
              description="Save the lines that made you pause."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {quotes.map((q) =>
                editingQuoteId === q.id ? (
                  <form
                    key={q.id}
                    onSubmit={saveEditQuote}
                    className="card flex flex-col gap-3 p-6"
                  >
                    <textarea
                      required
                      value={editForm.text}
                      onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                      className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                      rows={3}
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <input
                        required
                        value={editForm.book}
                        onChange={(e) => setEditForm({ ...editForm, book: e.target.value })}
                        className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                      />
                      <input
                        value={editForm.author}
                        onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                        className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                      />
                      <input
                        type="number"
                        min={0}
                        value={editForm.page}
                        onChange={(e) => setEditForm({ ...editForm, page: e.target.value })}
                        className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="rounded-full bg-red-deep px-5 py-2 text-sm font-semibold text-plum"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingQuoteId(null)}
                        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-plum-soft"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <QuoteCard
                    key={q.id}
                    quote={q}
                    onEdit={() => startEditQuote(q)}
                    onDelete={(id) => {
                      deleteQuote(id).then(() => {
                        refreshQuotes();
                        showToast("Quote removed", "success");
                      });
                    }}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
