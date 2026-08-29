"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser client, used from client components. Reads the two public
// Supabase env vars — these are meant to be exposed to the browser (that's
// how Supabase's anon key is designed to work; real security comes from
// Row Level Security policies in the database, not from hiding this key).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
