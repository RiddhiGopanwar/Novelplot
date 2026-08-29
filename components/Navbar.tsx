"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { useAuth } from "@/lib/AuthContext";

const LINKS = [
  { href: "/app", label: "My Reading" },
  { href: "/library", label: "Library" },
  { href: "/discover", label: "Discover" },
  { href: "/recommendations", label: "For You" },
  { href: "/shelves", label: "Shelves" },
  { href: "/wrapped", label: "Wrapped" },
  { href: "/personality", label: "Personality" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-plum bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-display text-2xl italic text-plum">
            Novel Plot<span className="not-italic">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                  active
                    ? "border-plum bg-red-soft text-plum shadow-pop-sm"
                    : "border-transparent text-plum-soft hover:border-plum hover:bg-red-soft/60 hover:text-plum"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!loading && (
            user ? (
              <button
                onClick={signOut}
                className="rounded-full border-2 border-plum bg-paper px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-plum-soft transition-colors hover:bg-red-soft/60 hover:text-plum"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border-2 border-transparent px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-plum-soft transition-colors hover:border-plum hover:bg-red-soft/60 hover:text-plum"
                >
                  Log In
                </Link>
                <Link href="/signup" className="btn-pill btn-pill-dot">
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border-2 border-plum bg-paper px-3 py-2 text-plum shadow-pop-sm md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-2 border-plum bg-paper px-5 py-3 md:hidden">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest ${
                  active ? "bg-red-soft text-plum" : "text-plum-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-1 border-t-2 border-plum/15 pt-2">
            {!loading && (
              user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="rounded-xl px-4 py-2 text-left font-mono text-xs font-bold uppercase tracking-widest text-plum-soft"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-plum-soft"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-plum-soft"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
