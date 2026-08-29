"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Book, Shelf } from "@/lib/types";
import {
  addShelf,
  deleteShelf,
  ensureSeeded,
  getBooks,
  getShelves,
  renameShelf,
  toggleBookOnShelf,
} from "@/lib/storage";
import { showToast } from "@/lib/toast";
import BookCard from "@/components/BookCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";

const EMOJI_OPTIONS = ["📚", "🍵", "🌙", "🌸", "🔍", "🗺️", "⭐", "🍃", "🕯️", "🎀"];

export default function ShelvesPage() {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [activeShelf, setActiveShelf] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);
  const [managing, setManaging] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    ensureSeeded();
    refreshShelves();
    getBooks().then(setBooks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshShelves() {
    getShelves().then((s) => {
      setShelves(s);
      setActiveShelf((prev) => prev ?? s[0]?.id ?? null);
    });
  }

  async function createShelf(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const shelf: Shelf = {
      id: `shelf_${Date.now()}`,
      name: name.trim(),
      emoji,
      bookIds: [],
    };
    await addShelf(shelf);
    const updated = await getShelves();
    setShelves(updated);
    setActiveShelf(shelf.id);
    setName("");
    setShowForm(false);
    showToast(`Shelf "${shelf.name}" created`, "success");
  }

  async function confirmRemoveShelf() {
    if (!current) return;
    const removedName = current.name;
    await deleteShelf(current.id);
    const updated = await getShelves();
    setShelves(updated);
    setActiveShelf(updated[0]?.id ?? null);
    setConfirmOpen(false);
    showToast(`Shelf "${removedName}" deleted. Books stay in your library`, "success");
  }

  function startRename() {
    if (!current) return;
    setRenameValue(current.name);
    setRenaming(true);
  }

  async function saveRename(e: FormEvent) {
    e.preventDefault();
    if (!current || !renameValue.trim()) return;
    await renameShelf(current.id, renameValue.trim());
    setShelves(await getShelves());
    setRenaming(false);
    showToast("Shelf renamed", "success");
  }

  const current = shelves.find((s) => s.id === activeShelf);
  const shelfBooks = current ? books.filter((b) => current.bookIds.includes(b.id)) : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="eyebrow">🗂️ playlists, but for books</span>
          <h1 className="font-display text-3xl font-bold text-plum">My Shelves</h1>
          <p className="text-sm text-plum-soft">Playlists, but for books.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-cream shadow-pop-sm"
        >
          {showForm ? "Cancel" : "+ New shelf"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={createShelf} className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-center">
          <div className="flex gap-1.5">
            {EMOJI_OPTIONS.map((e) => (
              <button
                type="button"
                key={e}
                onClick={() => setEmoji(e)}
                className={`h-9 w-9 rounded-full text-lg ${
                  emoji === e ? "bg-red-soft shadow-soft" : "bg-white/70"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Shelf name, e.g. Rainy Day Reads"
            className="flex-1 rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
          />
          <button
            type="submit"
            className="rounded-xl bg-red-deep px-5 py-3 text-sm font-semibold text-plum"
          >
            Create
          </button>
        </form>
      )}

      {shelves.length === 0 ? (
        <EmptyState
          emoji="🗂️"
          title="No shelves yet"
          description="Create your first shelf to start organizing your books your way."
        />
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {shelves.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveShelf(s.id)}
                className={`chip ${
                  activeShelf === s.id
                    ? "bg-red-soft text-plum shadow-pop-sm"
                    : "bg-paper text-plum-soft hover:bg-red-soft/40 hover:text-plum"
                }`}
              >
                <span>{s.emoji}</span>
                {s.name}
                <span className="text-plum-soft/70">({s.bookIds.length})</span>
              </button>
            ))}
          </div>

          {current && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {renaming ? (
                  <form onSubmit={saveRename} className="flex items-center gap-2">
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      className="rounded-xl border-2 border-plum/15 bg-paper p-2 text-sm text-plum outline-none focus:border-red-deep"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-red-deep px-4 py-2 text-xs font-semibold text-plum"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setRenaming(false)}
                      className="text-xs font-semibold text-plum-soft"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <h2 className="font-display text-xl text-plum">
                    {current.emoji} {current.name}
                  </h2>
                )}
                <div className="flex gap-3">
                  {!renaming && (
                    <button
                      onClick={startRename}
                      className="text-sm font-semibold text-plum-soft hover:text-plum"
                    >
                      Rename
                    </button>
                  )}
                  <button
                    onClick={() => setManaging((m) => !m)}
                    className="text-sm font-semibold text-plum-soft hover:text-plum"
                  >
                    {managing ? "Done" : "Manage books"}
                  </button>
                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="text-sm font-semibold text-red hover:opacity-80"
                  >
                    Delete shelf
                  </button>
                </div>
              </div>

              {managing ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {books.map((b) => (
                    <label
                      key={b.id}
                      className="card flex items-center gap-3 p-3 text-sm text-plum"
                    >
                      <input
                        type="checkbox"
                        checked={current.bookIds.includes(b.id)}
                        onChange={() => {
                          toggleBookOnShelf(current.id, b.id).then(() => {
                            getShelves().then(setShelves);
                          });
                        }}
                        className="h-4 w-4 accent-red-deep"
                      />
                      <span>
                        {b.title} <span className="text-plum-soft">by {b.author}</span>
                      </span>
                    </label>
                  ))}
                </div>
              ) : shelfBooks.length === 0 ? (
                <EmptyState
                  emoji="📎"
                  title="This shelf is empty"
                  description="Tap 'Manage books' to add books to this shelf."
                />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {shelfBooks.map((b) => (
                    <BookCard
                      key={b.id}
                      book={b}
                      onChanged={() => {
                        getBooks().then(setBooks);
                        getShelves().then(setShelves);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this shelf?"
        description={`"${current?.name}" will be deleted. The books on it will stay in your library.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmRemoveShelf}
      />
    </div>
  );
}
