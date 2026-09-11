"use client";

import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#05070b] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.25em] text-blue-400">
            PROVEN
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white">
            Sign in to your workspace
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Manage your assets, records, evidence, and history from one place.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}