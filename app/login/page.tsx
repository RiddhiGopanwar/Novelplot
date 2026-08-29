"use client";

import { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    showToast("Welcome back", "success");
    router.push(searchParams.get("next") || "/app");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6">
      <div className="text-center">
        <span className="eyebrow">🔖 welcome back</span>
        <h1 className="font-display text-3xl font-bold text-plum">Log In</h1>
      </div>

      <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-plum-soft">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-semibold text-plum-soft">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
          />
        </label>

        {error && <p className="text-sm text-red-deep">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary justify-center disabled:opacity-60">
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-sm text-plum-soft">
        New to Novel Plot?{" "}
        <Link href="/signup" className="font-semibold text-plum underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
