export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <div className="text-2xl font-bold tracking-tight">
          PROVEN<span className="text-blue-400">.</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#how-it-works" className="hover:text-white">
            How it works
          </a>
          <a href="#business" className="hover:text-white">
            For businesses
          </a>
          <button className="rounded-lg bg-white px-4 py-2 font-medium text-slate-900 hover:bg-slate-200">
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-8 pb-24 pt-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            Digital identity for physical assets
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Every physical asset
            <span className="block text-blue-400">
              deserves a history.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            PROVEN gives businesses a digital passport for every asset —
            tracking its identity, condition, evidence, and complete lifecycle
            history in one place.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button className="rounded-xl bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-400">
              Create an asset
            </button>

            <button className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-slate-300 hover:bg-white/5">
              See how it works
            </button>
          </div>
        </div>
      </section>

      {/* Core idea */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-slate-900/50 px-8 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            The PROVEN system
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Identity. Evidence. History.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Identity",
                text: "Give every physical asset a unique PROVEN ID.",
              },
              {
                number: "02",
                title: "Condition",
                text: "Record the asset's condition during inspections.",
              },
              {
                number: "03",
                title: "Evidence",
                text: "Attach photos, notes and timestamps to events.",
              },
              {
                number: "04",
                title: "Timeline",
                text: "Build a permanent lifecycle history for the asset.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-white/10 bg-slate-950 p-6"
              >
                <span className="text-sm text-blue-400">{item.number}</span>

                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business section */}
      <section id="business" className="mx-auto max-w-6xl px-8 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Built for businesses
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Know what happened to every asset.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              From rental companies and repair shops to equipment managers,
              PROVEN creates a reliable record of an asset's journey — so
              businesses can make decisions with evidence instead of guesswork.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">PROVEN ID</p>
                <p className="mt-1 text-xl font-semibold">PRV-8F42A</p>
              </div>

              <div className="rounded-lg bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
                Active
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-400">Asset</p>
              <p className="mt-1 text-2xl font-semibold">Canon EOS R6</p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["05 Sep", "Returned", "Minor scratch recorded"],
                ["02 Sep", "Rented", "Condition verified"],
                ["28 Aug", "Serviced", "Routine maintenance"],
              ].map(([date, event, detail]) => (
                <div
                  key={`${date}-${event}`}
                  className="flex gap-4 rounded-xl bg-slate-950 p-4"
                >
                  <span className="w-16 text-sm text-slate-500">{date}</span>

                  <div>
                    <p className="font-medium">{event}</p>
                    <p className="mt-1 text-sm text-slate-400">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-8 py-24 text-center">
        <h2 className="text-4xl font-bold">
          Give every asset a history.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-slate-400">
          Start building a trusted lifecycle record for the physical assets
          your business manages.
        </p>

        <button className="mt-8 rounded-xl bg-blue-500 px-7 py-3 font-semibold hover:bg-blue-400">
          Start with PROVEN
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-8 text-center text-sm text-slate-500">
        © 2026 PROVEN. The digital passport for physical assets.
      </footer>
    </main>
  );
}