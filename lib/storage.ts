
"use client";

import { Book, Quote, Shelf } from "./types";
import { createClient } from "./supabase/client";

// Lazily create the Supabase client on first actual use, not at module
// import time. Next.js evaluates page modules (which import this file)
// during the build process itself to build its route manifest — if the
// client were constructed at module scope, that build-time evaluation
// would try to create it before env vars are necessarily available in
// that context, crashing `next build` even for routes marked dynamic.
let _supabase: ReturnType<typeof createClient> | null = null;
function supabase() {
  if (!_supabase) _supabase = createClient();
  return _supabase;
}

async function currentUserId(): Promise<string | null> {
  const { data } = await supabase().auth.getUser();
  return data.user?.id ?? null;
}


// Kept as a no-op so existing call sites don't need to change. New accounts
// must always start completely empty, no seeded/demo data, so this
// intentionally does nothing now that data lives in Supabase per-user.
export function ensureSeeded() {
  // no-op
}

// ---------------------------------------------------------------
// Books
// ---------------------------------------------------------------

interface BookRow {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  status: Book["status"];
  current_page: number;
  total_pages: number;
  rating: number | null;
  genre: string | null;
  notes: string | null;
  date_added: string;
  date_completed: string | null;
}

function rowToBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    coverUrl: row.cover_url ?? undefined,
    status: row.status,
    currentPage: row.current_page,
    totalPages: row.total_pages,
    rating: row.rating ?? undefined,
    genre: row.genre ?? undefined,
    notes: row.notes ?? undefined,
    dateAdded: row.date_added,
    dateCompleted: row.date_completed ?? undefined,
  };
}

function bookToRow(book: Book, userId: string): BookRow & { user_id: string } {
  return {
    id: book.id,
    user_id: userId,
    title: book.title,
    author: book.author,
    cover_url: book.coverUrl ?? null,
    status: book.status,
    current_page: book.currentPage,
    total_pages: book.totalPages,
    rating: book.rating ?? null,
    genre: book.genre ?? null,
    notes: book.notes ?? null,
    date_added: book.dateAdded,
    date_completed: book.dateCompleted ?? null,
  };
}

export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase()
    .from("books")
    .select("*")
    .order("date_added", { ascending: false });
  if (error || !data) return [];
  return (data as BookRow[]).map(rowToBook);
}

export async function upsertBook(book: Book): Promise<void> {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase().from("books").upsert(bookToRow(book, userId));
}

export async function deleteBook(id: string): Promise<void> {
  // shelf_books rows for this book cascade-delete automatically (FK ON DELETE CASCADE).
  await supabase().from("books").delete().eq("id", id);
}

/** Clamp a page-progress update, auto-complete the book if it reaches the end. */
export async function updateBookProgress(id: string, rawPage: number): Promise<Book | null> {
  const books = await getBooks();
  const book = books.find((b) => b.id === id);
  if (!book) return null;

  const total = book.totalPages > 0 ? book.totalPages : rawPage;
  const page = Math.max(0, Math.min(rawPage, total));

  const updated: Book = { ...book, currentPage: page };
  if (page >= total && total > 0 && book.status !== "completed") {
    updated.status = "completed";
    updated.dateCompleted = new Date().toISOString();
  }
  await upsertBook(updated);
  return updated;
}

export async function updateBookRating(id: string, rating: number): Promise<void> {
  const books = await getBooks();
  const book = books.find((b) => b.id === id);
  if (!book) return;
  await upsertBook({ ...book, rating: Math.max(1, Math.min(5, rating)) });
}

export async function updateBookStatus(id: string, status: Book["status"]): Promise<void> {
  const books = await getBooks();
  const book = books.find((b) => b.id === id);
  if (!book) return;
  const updated: Book = { ...book, status };
  if (status === "completed") {
    updated.currentPage = book.totalPages;
    updated.dateCompleted = book.dateCompleted || new Date().toISOString();
  }
  await upsertBook(updated);
}

// ---------------------------------------------------------------
// Quotes
// ---------------------------------------------------------------

interface QuoteRow {
  id: string;
  text: string;
  book: string;
  author: string;
  page: number | null;
  date_added: string;
}

function rowToQuote(row: QuoteRow): Quote {
  return {
    id: row.id,
    text: row.text,
    book: row.book,
    author: row.author,
    page: row.page ?? undefined,
    dateAdded: row.date_added,
  };
}

export async function getQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase()
    .from("quotes")
    .select("*")
    .order("date_added", { ascending: false });
  if (error || !data) return [];
  return (data as QuoteRow[]).map(rowToQuote);
}

export async function addQuote(quote: Quote): Promise<void> {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase().from("quotes").insert({
    id: quote.id,
    user_id: userId,
    text: quote.text,
    book: quote.book,
    author: quote.author,
    page: quote.page ?? null,
    date_added: quote.dateAdded,
  });
}

export async function updateQuote(quote: Quote): Promise<void> {
  await supabase()
    .from("quotes")
    .update({
      text: quote.text,
      book: quote.book,
      author: quote.author,
      page: quote.page ?? null,
    })
    .eq("id", quote.id);
}

export async function deleteQuote(id: string): Promise<void> {
  await supabase().from("quotes").delete().eq("id", id);
}

// ---------------------------------------------------------------
// Shelves
// ---------------------------------------------------------------

export async function getShelves(): Promise<Shelf[]> {
  const { data: shelfRows, error } = await supabase()
    .from("shelves")
    .select("*")
    .order("created_at", { ascending: true });
  if (error || !shelfRows) return [];

  const { data: linkRows } = await supabase().from("shelf_books").select("shelf_id, book_id");
  const linksByShelf: Record<string, string[]> = {};
  (linkRows || []).forEach((l: { shelf_id: string; book_id: string }) => {
    if (!linksByShelf[l.shelf_id]) linksByShelf[l.shelf_id] = [];
    linksByShelf[l.shelf_id].push(l.book_id);
  });

  return shelfRows.map((s: { id: string; name: string; emoji: string }) => ({
    id: s.id,
    name: s.name,
    emoji: s.emoji,
    bookIds: linksByShelf[s.id] || [],
  }));
}

export async function addShelf(shelf: Shelf): Promise<void> {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase().from("shelves").insert({
    id: shelf.id,
    user_id: userId,
    name: shelf.name,
    emoji: shelf.emoji,
  });
}

export async function renameShelf(id: string, name: string): Promise<void> {
  await supabase().from("shelves").update({ name }).eq("id", id);
}

export async function deleteShelf(id: string): Promise<void> {
  // Deleting a shelf only removes the shelf itself; the books it referenced
  // stay in the main library untouched (shelf_books rows just cascade away).
  await supabase().from("shelves").delete().eq("id", id);
}

export async function toggleBookOnShelf(shelfId: string, bookId: string): Promise<void> {
  const userId = await currentUserId();
  if (!userId) return;
  const { data } = await supabase()
    .from("shelf_books")
    .select("shelf_id")
    .eq("shelf_id", shelfId)
    .eq("book_id", bookId)
    .maybeSingle();

  if (data) {
    await supabase().from("shelf_books").delete().eq("shelf_id", shelfId).eq("book_id", bookId);
  } else {
    await supabase().from("shelf_books").insert({ shelf_id: shelfId, book_id: bookId, user_id: userId });
  }
}

// ---------------------------------------------------------------
// Reading Personality result (saved per user)
// ---------------------------------------------------------------

export interface SavedPersonality {
  trait: string;
  reasons: string[];
  computedAt: string;
}

export async function getSavedPersonality(): Promise<SavedPersonality | null> {
  const { data, error } = await supabase().from("personality_results").select("*").maybeSingle();
  if (error || !data) return null;
  return { trait: data.trait, reasons: data.reasons ?? [], computedAt: data.computed_at };
}

export async function savePersonalityResult(trait: string, reasons: string[]): Promise<void> {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase().from("personality_results").upsert({
    user_id: userId,
    trait,
    reasons,
    computed_at: new Date().toISOString(),
  });
}

export async function clearPersonalityResult(): Promise<void> {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase().from("personality_results").delete().eq("user_id", userId);
}
```
