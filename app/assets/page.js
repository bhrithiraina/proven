"use client";

import { useEffect, useState } from "react";

export default function AssetsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [savedAsset, setSavedAsset] = useState(null);

    useEffect(() => {
  const storedAsset = localStorage.getItem("proven-new-asset");

  if (storedAsset) {
    setSavedAsset(JSON.parse(storedAsset));
  }
}, []);

  const assets = [
    {
      id: "PRV-8F42A",
      name: "Canon EOS R6",
      category: "Camera",
      condition: "Good",
      status: "Active",
      updated: "12 min ago",
    },
    {
      id: "PRV-31KD7",
      name: "Sony FX3",
      category: "Camera",
      condition: "Excellent",
      status: "Rented",
      updated: "1 hr ago",
    },
    {
      id: "PRV-92LM4",
      name: "DJI RS 3 Pro",
      category: "Stabilizer",
      condition: "Good",
      status: "Maintenance",
      updated: "3 hrs ago",
    },
    {
      id: "PRV-17QXA",
      name: "MacBook Pro 16",
      category: "Computer",
      condition: "Excellent",
      status: "Active",
      updated: "Yesterday",
    },
    {
      id: "PRV-44PL9",
      name: "Zoom H6",
      category: "Audio",
      condition: "Fair",
      status: "Needs attention",
      updated: "Yesterday",
    },
  ];
  const allAssets = savedAsset ? [savedAsset, ...assets] : assets;
  
  const filteredAssets = allAssets.filter((asset) => {
  const matchesSearch = `${asset.id} ${asset.name} ${asset.category}`
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || asset.status === statusFilter;

  const matchesCategory =
    categoryFilter === "All" || asset.category === categoryFilter;

  return matchesSearch && matchesStatus && matchesCategory;
});

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
              className="block rounded-lg px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </a>

            <a
              href="/assets"
              className="block rounded-lg bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400"
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
          <p className="text-sm font-medium">Demo Workspace</p>
          <p className="mt-1 text-xs text-slate-500">PROVEN Business</p>
        </div>
      </aside>

      {/* Main */}
      <section className="md:ml-64">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-sm text-slate-500">Workspace</p>
            <h1 className="mt-1 text-2xl font-bold">Assets</h1>
          </div>

          <button className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold hover:bg-blue-400">
            + Add asset
          </button>
        </header>

        <div className="px-6 py-8 md:px-10">
          {/* Page introduction */}
          <div>
            <h2 className="text-2xl font-bold">
              Your asset registry
            </h2>

            <p className="mt-2 text-slate-400">
              Every physical asset with its PROVEN identity and current status.
            </p>
          </div>

          {/* Search / filters */}
          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Search assets or PROVEN ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400 md:max-w-md"
            />
           

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-sm text-slate-300 outline-none"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Needs attention">Needs attention</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-sm text-slate-300 outline-none"
            >
              <option value="All">All categories</option>
              <option value="Camera">Camera</option>
              <option value="Stabilizer">Stabilizer</option>
              <option value="Computer">Computer</option>
              <option value="Audio">Audio</option>
            </select>
          </div>

          {/* Asset table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <div className="hidden grid-cols-6 gap-4 border-b border-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
              <span className="col-span-2">Asset</span>
              <span>Category</span>
              <span>Condition</span>
              <span>Status</span>
              <span>Updated</span>
            </div>

            <div className="divide-y divide-white/10">
              {filteredAssets.map((asset) => (
                <a
                  href={`/assets/${asset.id}`}
                  key={asset.id}
                  className="block px-6 py-5 transition hover:bg-white/[0.03]"
                >
                  <div className="grid gap-4 md:grid-cols-6 md:items-center">
                    {/* Asset */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 font-semibold text-blue-400">
                          P
                        </div>

                        <div>
                          <p className="font-medium">
                            {asset.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {asset.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <p className="text-sm text-slate-400 md:hidden">
                        Category
                      </p>
                      <p className="text-sm">{asset.category}</p>
                    </div>

                    {/* Condition */}
                    <div>
                      <p className="text-sm text-slate-400 md:hidden">
                        Condition
                      </p>
                      <p className="text-sm">{asset.condition}</p>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-sm text-slate-400 md:hidden">
                        Status
                      </p>

                      <span
                        className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-medium ${
                          asset.status === "Active"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : asset.status === "Rented"
                              ? "bg-blue-400/10 text-blue-400"
                              : asset.status === "Maintenance"
                                ? "bg-amber-400/10 text-amber-400"
                                : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </div>

                    {/* Updated */}
                    <div>
                      <p className="text-sm text-slate-400 md:hidden">
                        Updated
                      </p>

                      <p className="text-sm text-slate-500">
                        {asset.updated}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom information */}
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <span>Showing 5 of 128 assets</span>

            <span className="text-blue-400">
              Asset registry
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}