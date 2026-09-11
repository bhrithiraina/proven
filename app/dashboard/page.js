"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
      }
    };

    checkUser();
  }, [router]);

  const stats = [
    { label: "Total assets", value: "128" },
    { label: "Active", value: "94" },
    { label: "Under maintenance", value: "12" },
    { label: "Needs attention", value: "6" },
  ];

  const recentActivity = [
    {
      id: "PRV-8F42A",
      asset: "Canon EOS R6",
      event: "Returned",
      detail: "Minor scratch recorded",
      time: "12 min ago",
    },
    {
      id: "PRV-31KD7",
      asset: "Sony FX3",
      event: "Rented",
      detail: "Condition verified",
      time: "1 hr ago",
    },
    {
      id: "PRV-92LM4",
      asset: "DJI RS 3 Pro",
      event: "Serviced",
      detail: "Routine maintenance completed",
      time: "3 hrs ago",
    },
    {
      id: "PRV-17QXA",
      asset: "MacBook Pro 16",
      event: "Inspection",
      detail: "Battery condition recorded",
      time: "Yesterday",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
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
              className="block rounded-lg bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Assets
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Activity
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Settings
            </a>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6 border-t border-white/10 pt-5">
          <p className="text-sm font-medium">PROVEN Workspace</p>
          <p className="mt-1 text-xs text-slate-500">Business account</p>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/login");
            }}
            className="mt-4 w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <section className="md:ml-64">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">
          <div>
            <p className="text-sm text-slate-500">Workspace</p>
            <h1 className="mt-1 text-2xl font-bold">Dashboard</h1>
          </div>

          <button
            onClick={() => (window.location.href = "/assets/new")}
            className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold hover:bg-blue-400"
          >
            + Add asset
          </button>
        </header>

        {/* Dashboard body */}
        <div className="px-6 py-8 md:px-10">
          {/* Welcome */}
          <div>
            <p className="text-slate-400">
              Here's what's happening with your assets.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-900 p-6"
              >
                <p className="text-sm text-slate-500">{stat.label}</p>

                <p className="mt-3 text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Recent activity */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <h2 className="font-semibold">Recent activity</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest events across your assets
                  </p>
                </div>

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  View all
                </button>
              </div>

              <div className="divide-y divide-white/10">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-4 px-6 py-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-semibold text-blue-400">
                        P
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {activity.asset}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {activity.id} · {activity.detail}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium">{activity.event}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="font-semibold">Quick actions</h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your asset records.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => (window.location.href = "/assets/new")}
                  className="w-full rounded-xl bg-blue-500 px-4 py-3 text-left text-sm font-semibold hover:bg-blue-400"
                >
                  + Create an asset
                </button>

                <button className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/5">
                  Record an inspection
                </button>

                <button className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/5">
                  Add evidence
                </button>
              </div>

              {/* System status */}
              <div className="mt-8 rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    System operational
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  All PROVEN services are currently running normally.
                </p>
              </div>
            </div>
          </div>

          {/* Asset spotlight */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                  Asset spotlight
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  PRV-8F42A
                </h2>

                <p className="mt-1 text-slate-400">
                  Canon EOS R6
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-400">
                  Active
                </span>

                <button className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5">
                  View asset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}