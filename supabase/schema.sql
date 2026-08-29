-- The Novel Plot — Supabase schema + Row Level Security
-- Run this once in your Supabase project's SQL Editor (Database > SQL Editor).
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS where sensible.

-- ============================================================
-- BOOKS
-- ============================================================
create table if not exists public.books (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  author text not null,
  cover_url text,
  status text not null check (status in ('currently-reading', 'want-to-read', 'completed')),
  current_page integer not null default 0,
  total_pages integer not null default 0,
  rating integer check (rating between 1 and 5),
  genre text,
  notes text,
  date_added timestamptz not null default now(),
  date_completed timestamptz
);

alter table public.books enable row level security;

drop policy if exists "books_select_own" on public.books;
create policy "books_select_own" on public.books
  for select using (auth.uid() = user_id);

drop policy if exists "books_insert_own" on public.books;
create policy "books_insert_own" on public.books
  for insert with check (auth.uid() = user_id);

drop policy if exists "books_update_own" on public.books;
create policy "books_update_own" on public.books
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "books_delete_own" on public.books;
create policy "books_delete_own" on public.books
  for delete using (auth.uid() = user_id);

-- ============================================================
-- SHELVES
-- ============================================================
create table if not exists public.shelves (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  emoji text not null default '📚',
  created_at timestamptz not null default now()
);

alter table public.shelves enable row level security;

drop policy if exists "shelves_select_own" on public.shelves;
create policy "shelves_select_own" on public.shelves
  for select using (auth.uid() = user_id);

drop policy if exists "shelves_insert_own" on public.shelves;
create policy "shelves_insert_own" on public.shelves
  for insert with check (auth.uid() = user_id);

drop policy if exists "shelves_update_own" on public.shelves;
create policy "shelves_update_own" on public.shelves
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "shelves_delete_own" on public.shelves;
create policy "shelves_delete_own" on public.shelves
  for delete using (auth.uid() = user_id);

-- ============================================================
-- SHELF_BOOKS (junction table)
-- ============================================================
create table if not exists public.shelf_books (
  shelf_id text not null references public.shelves(id) on delete cascade,
  book_id text not null references public.books(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (shelf_id, book_id)
);

alter table public.shelf_books enable row level security;

drop policy if exists "shelf_books_select_own" on public.shelf_books;
create policy "shelf_books_select_own" on public.shelf_books
  for select using (auth.uid() = user_id);

drop policy if exists "shelf_books_insert_own" on public.shelf_books;
create policy "shelf_books_insert_own" on public.shelf_books
  for insert with check (auth.uid() = user_id);

drop policy if exists "shelf_books_delete_own" on public.shelf_books;
create policy "shelf_books_delete_own" on public.shelf_books
  for delete using (auth.uid() = user_id);

-- ============================================================
-- QUOTES
-- ============================================================
create table if not exists public.quotes (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  book text not null,
  author text not null,
  page integer,
  date_added timestamptz not null default now()
);

alter table public.quotes enable row level security;

drop policy if exists "quotes_select_own" on public.quotes;
create policy "quotes_select_own" on public.quotes
  for select using (auth.uid() = user_id);

drop policy if exists "quotes_insert_own" on public.quotes;
create policy "quotes_insert_own" on public.quotes
  for insert with check (auth.uid() = user_id);

drop policy if exists "quotes_update_own" on public.quotes;
create policy "quotes_update_own" on public.quotes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "quotes_delete_own" on public.quotes;
create policy "quotes_delete_own" on public.quotes
  for delete using (auth.uid() = user_id);

-- ============================================================
-- PERSONALITY RESULTS (one saved result per user)
-- ============================================================
create table if not exists public.personality_results (
  user_id uuid primary key references auth.users(id) on delete cascade,
  trait text not null,
  reasons jsonb not null default '[]'::jsonb,
  computed_at timestamptz not null default now()
);

alter table public.personality_results enable row level security;

drop policy if exists "personality_select_own" on public.personality_results;
create policy "personality_select_own" on public.personality_results
  for select using (auth.uid() = user_id);

drop policy if exists "personality_upsert_own" on public.personality_results;
create policy "personality_upsert_own" on public.personality_results
  for insert with check (auth.uid() = user_id);

drop policy if exists "personality_update_own" on public.personality_results;
create policy "personality_update_own" on public.personality_results
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "personality_delete_own" on public.personality_results;
create policy "personality_delete_own" on public.personality_results
  for delete using (auth.uid() = user_id);

-- ============================================================
-- Helpful indexes
-- ============================================================
create index if not exists books_user_id_idx on public.books(user_id);
create index if not exists shelves_user_id_idx on public.shelves(user_id);
create index if not exists shelf_books_user_id_idx on public.shelf_books(user_id);
create index if not exists quotes_user_id_idx on public.quotes(user_id);
