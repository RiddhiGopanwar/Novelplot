"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // A brand-new account always starts with a completely empty library,
    // no shelves, no quotes, no seeded/demo data of any kind.
    if (data.session) {
      showToast("Account created", "success");
      router.push("/app");
      router.refresh();
    } else {
      // Email confirmation is required by this Supabase project's settings.
      setCheckEmail(true);
    }
  }

  if (checkEmail) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
        <span className="text-3xl">📬</span>
        <h1 className="font-display text-2xl font-bold text-plum">Check your email</h1>
        <p className="text-sm text-plum-soft">
          We sent a confirmation link to {email}. Click it, then come back and log in.
        </p>
        <Link href="/login" className="btn-pill btn-pill-dot">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6">
      <div className="text-center">
        <span className="eyebrow">📖 start your shelf</span>
        <h1 className="font-display text-3xl font-bold text-plum">Create an Account</h1>
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
            minLength={6}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border-2 border-plum/15 bg-paper p-3 text-sm text-plum outline-none focus:border-red-deep"
          />
          <span className="text-xs text-plum-soft/70">At least 6 characters</span>
        </label>

        {error && <p className="text-sm text-red-deep">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary justify-center disabled:opacity-60">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-plum-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-plum underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
