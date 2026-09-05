export default async function AssetDetail({ params }) {
  const { id } = await params;

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
          <p className="mt-1 text-xs text-slate-500">
            PROVEN Business
          </p>
        </div>
      </aside>

      {/* Main */}
      <section className="md:ml-64">
        {/* Header */}
        <header className="border-b border-white/10 px-6 py-5 md:px-10">
          <a
            href="/assets"
            className="text-sm text-slate-500 hover:text-white"
          >
            ← Back to assets
          </a>
        </header>

        <div className="px-6 py-8 md:px-10">
          {/* Asset heading */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-xl font-bold text-blue-400">
                P
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  PROVEN ID
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                  {id}
                </h1>

                <p className="mt-2 text-lg text-slate-400">
                  Canon EOS R6
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                Active
              </span>

              <button className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5">
                Edit asset
              </button>
            </div>
          </div>

          {/* Overview cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-500">
                Condition
              </p>

              <p className="mt-3 text-2xl font-bold">
                Good
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Last inspected 2 Sep 2026
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="mt-3 text-2xl font-bold">
                Camera
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Photography equipment
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-500">
                Created
              </p>

              <p className="mt-3 text-2xl font-bold">
                28 Aug 2026
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Asset registered in PROVEN
              </p>
            </div>
          </div>

          {/* Content grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Timeline */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 lg:col-span-2">
              <div className="border-b border-white/10 px-6 py-5">
                <h2 className="font-semibold">
                  Lifecycle history
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  A complete record of events associated with this asset.
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-8">
                  {/* Event 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                        R
                      </div>

                      <div className="mt-2 h-full w-px bg-white/10" />
                    </div>

                    <div className="pb-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">
                          Returned
                        </h3>

                        <span className="text-xs text-slate-500">
                          05 Sep 2026 · 10:42 AM
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Asset returned after rental period.
                        Minor scratch recorded during inspection.
                      </p>

                      <button className="mt-3 text-sm text-blue-400 hover:text-blue-300">
                        View evidence →
                      </button>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                        R
                      </div>

                      <div className="mt-2 h-full w-px bg-white/10" />
                    </div>

                    <div className="pb-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">
                          Rented
                        </h3>

                        <span className="text-xs text-slate-500">
                          02 Sep 2026 · 09:15 AM
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Asset checked and condition verified
                        before being handed to the customer.
                      </p>

                      <button className="mt-3 text-sm text-blue-400 hover:text-blue-300">
                        View evidence →
                      </button>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                        S
                      </div>

                      <div className="mt-2 h-full w-px bg-white/10" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold">
                          Serviced
                        </h3>

                        <span className="text-xs text-slate-500">
                          28 Aug 2026 · 02:30 PM
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Routine maintenance completed.
                        Camera functions tested and verified.
                      </p>

                      <button className="mt-3 text-sm text-blue-400 hover:text-blue-300">
                        View service record →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div>
                <h2 className="font-semibold">
                  Evidence
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Records attached to this asset.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
                  <p className="text-sm font-medium">
                    Return inspection
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    05 Sep 2026
                  </p>

                  <p className="mt-3 text-sm text-blue-400">
                    3 photos attached
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
                  <p className="text-sm font-medium">
                    Pre-rental inspection
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    02 Sep 2026
                  </p>

                  <p className="mt-3 text-sm text-blue-400">
                    4 photos attached
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
                  <p className="text-sm font-medium">
                    Service record
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    28 Aug 2026
                  </p>

                  <p className="mt-3 text-sm text-blue-400">
                    1 document attached
                  </p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5">
                + Add evidence
              </button>
            </div>
          </div>

          {/* Asset metadata */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="font-semibold">
              Asset information
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Manufacturer
                </p>

                <p className="mt-2 text-sm font-medium">
                  Canon
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Model
                </p>

                <p className="mt-2 text-sm font-medium">
                  EOS R6
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Serial number
                </p>

                <p className="mt-2 text-sm font-medium">
                  R6X-2026-8842
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  PROVEN ID
                </p>

                <p className="mt-2 text-sm font-medium">
                  {id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}