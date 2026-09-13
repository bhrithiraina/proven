"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setUser(user);
    };

    loadUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-950 p-6 md:block">
        <div className="text-2xl font-bold tracking-tight">
          PROVEN<span className="text-blue-400">.</span>
        </div>

        <div className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Workspace
          </p>

          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </a>

            <a
              href="/assets"
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Assets
            </a>

            <a
              href="/activity"
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Activity
            </a>

            <a
              href="/settings"
              className="block rounded-lg bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400"
            >
              Settings
            </a>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6 border-t border-white/10 pt-5">
          <p className="text-sm font-medium">PROVEN Workspace</p>
          <p className="mt-1 text-xs text-slate-500">Business account</p>

          <button
            onClick={handleSignOut}
            className="mt-4 w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <section className="md:ml-64">
        <header className="border-b border-white/10 px-6 py-5 md:px-10">
          <p className="text-sm text-slate-500">Workspace</p>
          <h1 className="mt-1 text-2xl font-bold">Settings</h1>
        </header>

        <div className="max-w-3xl px-6 py-8 md:px-10">
          <p className="text-slate-400">
            Manage your PROVEN workspace and account.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="font-semibold">Account</h2>

            <div className="mt-6">
              <p className="text-sm text-slate-500">Signed in with Google</p>

              <p className="mt-2 text-sm text-white">
                {user?.email || "Loading..."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="font-semibold">Workspace</h2>

            <p className="mt-2 text-sm text-slate-500">
              PROVEN Business Workspace
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Asset records, evidence, lifecycle history, and public
              passports are managed from this workspace.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-red-400/10 bg-red-400/5 p-6">
            <h2 className="font-semibold text-red-300">Account actions</h2>

            <button
              onClick={handleSignOut}
              className="mt-5 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Sign out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}