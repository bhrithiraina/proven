import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function PassportPage({ params }) {
  const { token } = await params;

  const { data: asset, error: assetError } = await supabaseAdmin
    .from("assets")
    .select("*")
    .eq("public_token", token)
    .single();

  if (assetError || !asset) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-blue-400">
            PROVEN
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            Asset not found
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            This passport link may be invalid or expired.
          </p>
        </div>
      </main>
    );
  }

  const { data: events } = await supabaseAdmin
    .from("asset_events")
    .select("*")
    .eq("asset_id", asset.id)
    .order("created_at", { ascending: false });

  const { data: evidence } = await supabaseAdmin
    .from("asset_evidence")
    .select("*")
    .eq("asset_id", asset.id)
    .order("created_at", { ascending: false });

  const evidenceWithUrls = await Promise.all(
    (evidence || []).map(async (item) => {
      const { data } = await supabaseAdmin.storage
        .from("evidence")
        .createSignedUrl(item.file_path, 60 * 60);

      return {
        ...item,
        imageUrl: data?.signedUrl || null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-blue-400">
              PROVEN
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Verified Asset Passport
            </p>
          </div>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            Verified
          </div>
        </div>

        {/* Identity */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Asset identity
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {asset.name}
          </h1>

          <p className="mt-2 text-sm font-medium text-blue-400">
            {asset.proven_id}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Category</p>
              <p className="mt-2 font-medium">{asset.category}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Condition</p>
              <p className="mt-2 font-medium">{asset.condition}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Status</p>
              <p className="mt-2 font-medium">{asset.status}</p>
            </div>
          </div>
        </section>

        {/* Evidence */}
        <section className="mt-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Evidence
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Visual record
            </h2>
          </div>

          {evidenceWithUrls.length === 0 ? (
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">
                No evidence has been added yet.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {evidenceWithUrls.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.file_name}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center text-sm text-slate-500">
                      Image unavailable
                    </div>
                  )}

                  <div className="p-4">
                    <p className="text-sm font-medium">
                      {item.file_name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Added{" "}
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Timeline */}
        <section className="mt-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Lifecycle history
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Asset timeline
          </h2>

          <div className="mt-6 space-y-6">
            {!events || events.length === 0 ? (
              <p className="text-sm text-slate-500">
                No lifecycle events recorded yet.
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                      +
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold">
                        {event.title}
                      </h3>

                      <span className="text-xs text-slate-500">
                        {new Date(event.created_at).toLocaleString()}
                      </span>
                    </div>

                    {event.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-slate-600">
            This digital passport was generated by PROVEN.
          </p>
        </footer>
      </div>
    </main>
  );
}