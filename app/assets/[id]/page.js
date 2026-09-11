"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AssetDetail() {
  const params = useParams();
  const id = params.id;

  const [asset, setAsset] = useState(null);
  const [events, setEvents] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadAsset = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .eq("proven_id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setAsset(data);
      
      const { data: eventData, error: eventError } = await supabase
        .from("asset_events")
        .select("*")
        .eq("asset_id", data.id)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (eventError) {
        console.error(eventError);
        return;
      }

      const { data: evidenceData, error: evidenceError } = await supabase
        .from("asset_evidence")
        .select("*")
        .eq("asset_id", data.id)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (evidenceError) {
        console.error(evidenceError);
        return;
      }

      setEvidence(evidenceData || []);

      setEvents(eventData || []);
    };

    loadAsset();
  }, [id]);

  if (!asset) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading asset...</p>
      </main>
    );
  }

const currentAsset = asset;

  const handleAddEvidence = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setUploading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please sign in first.");
        window.location.href = "/login";
        return;
      }

      const fileExtension = file.name.split(".").pop();

      const filePath = `${user.id}/${currentAsset.id}/${crypto.randomUUID()}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("evidence")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        return;
      }

      const { error: evidenceError } = await supabase
        .from("asset_evidence")
        .insert({
          asset_id: currentAsset.id,
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
        });

      if (evidenceError) {
        console.error(evidenceError);
        alert(evidenceError.message);
        return;
      }

      const { error: eventError } = await supabase
        .from("asset_events")
        .insert({
          asset_id: currentAsset.id,
          user_id: user.id,
          event_type: "evidence",
          title: "Evidence added",
          description: `Evidence file added: ${file.name}`,
        });

      if (eventError) {
        console.error(eventError);
      }

      const { data: updatedEvidence, error: reloadError } = await supabase
        .from("asset_evidence")
        .select("*")
        .eq("asset_id", currentAsset.id)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (reloadError) {
        console.error(reloadError);
        return;
      }

      setEvidence(updatedEvidence || []);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

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
                  {currentAsset.proven_id}
                </h1>

                <p className="mt-2 text-lg text-slate-400">
                  {currentAsset.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                {currentAsset.status}
              </span>

              <button
                onClick={() => (window.location.href = `/assets/${id}/edit`)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
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
                {currentAsset.condition}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Current asset condition
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="mt-3 text-2xl font-bold">
                {currentAsset.category}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Asset category
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-500">
                Created
              </p>

              <p className="mt-3 text-2xl font-bold">
                {new Date(currentAsset.created_at).toLocaleDateString()}
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
                  {events.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No lifecycle events recorded yet.
                    </p>
                  ) : (
                    events.map((event) => (
                      <div className="flex gap-4" key={event.id}>
                        <div className="flex flex-col items-center">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                            +
                          </div>
                        </div>

                        <div>
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

              {evidence.length === 0 ? (
                <div className="mt-6 rounded-xl border border-white/10 bg-slate-950 p-4">
                  <p className="text-sm font-medium">
                    No evidence yet
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Add photos or other visual evidence for this asset.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {evidence.map((item) => (
                    <EvidenceItem key={item.id} item={item} />
                  ))}
                </div>
              )}

              <label className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5">
              {uploading ? "Uploading..." : "+ Add evidence"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddEvidence}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
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
                  {currentAsset.manufacturer || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Model
                </p>

                <p className="mt-2 text-sm font-medium">
                  {currentAsset.model || currentAsset.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Serial number
                </p>

                <p className="mt-2 text-sm font-medium">
                  {currentAsset.serialNumber || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  PROVEN ID
                </p>

                <p className="mt-2 text-sm font-medium">
                  {currentAsset.proven_id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function EvidenceItem({ item }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const { data, error } = await supabase.storage
        .from("evidence")
        .createSignedUrl(item.file_path, 60 * 60);

      if (error) {
        console.error(error);
        return;
      }

      setImageUrl(data.signedUrl);
    };

    loadImage();
  }, [item.file_path]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item.file_name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center text-sm text-slate-500">
          Loading image...
        </div>
      )}

      <div className="p-4">
        <p className="text-sm font-medium text-white">
          {item.file_name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Added {new Date(item.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}