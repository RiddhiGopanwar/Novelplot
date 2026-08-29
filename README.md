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
