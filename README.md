# The Novel Plot 📖

A cozy, editorial personal reading companion, now multi-user, built with
Next.js (App Router), React, TypeScript, Tailwind CSS, and Supabase
(Auth + Postgres).

## Features

- Sign up, log in, and log out — every reader gets their own private account
- Track Currently Reading / Want to Read / Completed books with page progress
- Custom shelves (playlists, but for books)
- Save favourite quotes with book, author, and page
- Discover books via the Google Books API
- Mood-based book recommendations, plus a browsable Recommendations page
- Reading Wrapped — a Spotify-Wrapped-style yearly summary
- Reading Personality — an interactive quiz, with your result saved to your profile

All reading data (books, shelves, quotes, personality result) lives in
Supabase Postgres, scoped to your account with Row Level Security — nobody
else can see or touch your library.

## Getting started

```bash
npm install
```

Then set up Supabase (see below) before running:

```bash
npm run dev
```

Open http://localhost:3000.

## Supabase setup (required)

1. Create a free project at https://supabase.com
2. In **Project Settings > API**, copy the **Project URL** and the
   **anon public** key
3. Add them to `.env.local` (already has a Google Books key in it, just add
   these two lines):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. In the Supabase dashboard, open **SQL Editor**, paste in the full
   contents of `supabase/schema.sql` from this project, and run it once.
   This creates the `books`, `shelves`, `shelf_books`, `quotes`, and
   `personality_results` tables, all with Row Level Security policies so
   each user can only ever read or write their own rows.
5. By default, Supabase requires email confirmation for new sign-ups. For
   local development you can turn this off in **Authentication > Providers
   > Email > Confirm email**, or just click the confirmation link Supabase
   emails to you.

New accounts always start completely empty, no demo books, no seeded
shelves, nothing added automatically. Every book only enters a library
because the signed-in user explicitly clicked "Add to Want to Read,"
"Start Reading," or "Add to Shelf."

## Build

```bash
npm run typecheck
npm run build
```

## Deploying to Vercel / Netlify

1. Push this project to a GitHub repo (or deploy the zip directly).
2. Import the repo in Vercel or Netlify.
3. Add these environment variables in your host's dashboard (required,
   `.env.local` is gitignored and won't be picked up by your host's build):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY` (optional but recommended, improves
     Discover search reliability)
4. Deploy.

Both Supabase's anon key and the Google Books key are designed to be
exposed to the browser, real protection comes from Supabase's Row Level
Security policies (in `supabase/schema.sql`), not from hiding these keys.
For extra safety, you can still restrict the Google Books key by HTTP
referrer in the Google Cloud Console.

## Project structure

```
app/            Route pages:
                  /            public landing page (about, features, how it works)
                  /login       log in
                  /signup      create an account
                  /app         your reading dashboard (requires login)
                  /library     Currently Reading / Want to Read / Completed / Quotes
                  /discover    Google Books search (browsable while logged out;
                                 adding to your library requires an account)
                  /recommendations  browse curated book categories
                  /shelves     custom shelves
                  /wrapped     Reading Wrapped
                  /personality Reading Personality
                  /book/[id]   book details & edit page
components/     Shared UI (Navbar, Footer, Logo, BookCard, QuoteCard, etc.)
lib/            Types, Supabase-backed data layer, mood data, personality
                quiz logic, Google Books client, Supabase client helpers,
                auth context
lib/supabase/   Supabase browser + server client setup
supabase/       schema.sql — run once in your Supabase project
public/brand/   Standalone logo/brand images (icon mark, wordmark lockup,
                social/brand cover)
```

## Notes

- A brand-new account starts completely empty, no seeded example data.
- Discover is browsable while signed out, but adding a book to your library
  requires an account.

## Future Development

Multi-user accounts, per-user libraries, and Reading Personality as an
interactive quiz are all built now. These are directions the project could
still grow into later, none of them are built yet.

- **Posts & discussions** — the ability to post updates, thoughts, or
  reviews (not just private quotes), plus comments/likes on other
  readers' posts — turning quotes and Wrapped summaries into shareable
  content.
- **Buddy reads & book clubs** — shared shelves multiple people can read
  along with, with group discussion threads per book.
- **Public shelves & profile pages** — an opt-in public version of a
  user's shelves, Wrapped, and Reading Personality that can be shared
  via a link.
- **Notifications** — reminders to keep a reading streak going, or
  updates when someone you follow finishes a book.
- **Richer recommendations** — recommendations informed by your actual
  library and ratings (not just a static mood-to-book mapping), and
  possibly by what similar readers enjoyed.
- **Mobile app** — a native or PWA version for logging pages read
  on the go.
- **Import/export** — importing an existing library from Goodreads/CSV,
  and exporting your own data.

Any of these would be significant additions on top of the current V1
architecture and would need real product/design decisions (privacy,
moderation, backend costs) before being built.
