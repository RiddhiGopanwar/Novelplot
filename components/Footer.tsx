import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-plum bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="font-display text-xl italic text-plum">
                Novel Plot<span className="not-italic">.</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-plum-soft">
              A cozy space to organize your library, track your reading journey, discover your next obsession, and understand what kind of reader you really are.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="eyebrow">Explore</span>
            <Link href="/#about" className="text-sm text-plum-soft hover:text-plum">About</Link>
            <Link href="/#features" className="text-sm text-plum-soft hover:text-plum">Features</Link>
            <Link href="/discover" className="text-sm text-plum-soft hover:text-plum">Discover</Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="eyebrow">Your reading</span>
            <Link href="/app" className="text-sm text-plum-soft hover:text-plum">My Reading</Link>
            <Link href="/library" className="text-sm text-plum-soft hover:text-plum">Library</Link>
            <Link href="/wrapped" className="text-sm text-plum-soft hover:text-plum">Reading Wrapped</Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-plum/15 pt-6 font-mono text-xs uppercase tracking-wide text-plum-soft sm:flex-row">
          <span>© {new Date().getFullYear()} The Novel Plot</span>
          <span>For every reader, there’s a Novel Plot.</span>
        </div>
      </div>
    </footer>
  );
}
