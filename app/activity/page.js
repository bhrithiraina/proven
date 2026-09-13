"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function ActivityPage() {
  const router = useRouter();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivity = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: events, error } = await supabase
        .from("asset_events")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Activity loading error:", error);
        setLoading(false);
        return;
      }

      const { data: assets } = await supabase
        .from("assets")
        .select("id, proven_id, name")
        .eq("user_id", user.id);

      const activityData = (events || []).map((event) => {
        const asset = (assets || []).find(
          (item) => item.id === event.asset_id
        );

        return {
          ...event,
          assetName: asset?.name || "Unknown asset",
          provenId: asset?.proven_id || "Unknown",
        };
      });

      setActivity(activityData);
      setLoading(false);
    };

    loadActivity();
  }, [router]);

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
              className="block rounded-lg bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400"
            >
              Activity
            </a>

            <a
              href="/settings"
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

      <section className="md:ml-64">
        <header className="border-b border-white/10 px-6 py-5 md:px-10">
          <p className="text-sm text-slate-500">Workspace</p>
          <h1 className="mt-1 text-2xl font-bold">Activity</h1>
        </header>

        <div className="px-6 py-8 md:px-10">
          <p className="text-slate-400">
            Complete lifecycle activity across your assets.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900">
            {loading ? (
              <div className="p-6">
                <p className="text-sm text-slate-500">
                  Loading activity...
                </p>
              </div>
            ) : activity.length === 0 ? (
              <div className="p-6">
                <p className="font-medium">No activity yet</p>
                <p className="mt-2 text-sm text-slate-500">
                  Asset registrations, inspections, rentals, returns,
                  maintenance, and other events will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {activity.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-4 px-6 py-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-semibold text-blue-400">
                      P
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">{event.title}</p>

                      <p className="mt-1 text-sm text-slate-400">
                        {event.assetName} · {event.provenId}
                      </p>

                      {event.description && (
                        <p className="mt-2 text-sm text-slate-500">
                          {event.description}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-slate-600">
                        {new Date(event.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}