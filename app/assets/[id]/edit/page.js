"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function EditAssetPage() {
  const params = useParams();
  const id = params.id;

  const [asset, setAsset] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Camera");
  const [condition, setCondition] = useState("Good");
  const [status, setStatus] = useState("Active");

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
      setName(data.name);
      setCategory(data.category);
      setCondition(data.condition);
      setStatus(data.status);
    };

    loadAsset();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Please enter an asset name.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please sign in first.");
      window.location.href = "/login";
      return;
    }

    // Check what changed before updating
    const conditionChanged = asset.condition !== condition;
    const statusChanged = asset.status !== status;

    const { error } = await supabase
      .from("assets")
      .update({
        name: name.trim(),
        category,
        condition,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("proven_id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    // Record condition change
    if (conditionChanged) {
      const { error: eventError } = await supabase
        .from("asset_events")
        .insert({
          asset_id: asset.id,
          user_id: user.id,
          event_type: "condition_update",
          title: "Condition updated",
          description: `Condition changed from ${asset.condition} to ${condition}.`,
        });

      if (eventError) {
        console.error(eventError);
      }
    }

    // Record status change
    if (statusChanged) {
      const { error: eventError } = await supabase
        .from("asset_events")
        .insert({
          asset_id: asset.id,
          user_id: user.id,
          event_type: "status_update",
          title: "Status updated",
          description: `Status changed from ${asset.status} to ${status}.`,
        });

      if (eventError) {
        console.error(eventError);
      }
    }

    window.location.href = `/assets/${id}`;
  };

  if (!asset) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-slate-400">
            Asset not found.
          </p>

          <a
            href="/assets"
            className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to assets
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <a
          href={`/assets/${id}`}
          className="text-sm text-slate-500 hover:text-white"
        >
          ← Back to asset
        </a>

        <div className="mt-8">
          <p className="text-sm text-slate-500">
            Edit asset
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {asset.proven_id}
          </h1>

          <p className="mt-2 text-slate-400">
            Update the information associated with this asset.
          </p>
        </div>

        <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div>
            <label className="text-sm font-medium text-slate-300">
              Asset name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="Camera">Camera</option>
              <option value="Stabilizer">Stabilizer</option>
              <option value="Computer">Computer</option>
              <option value="Audio">Audio</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Condition
            </label>

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Needs attention">
                Needs attention
              </option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => (window.location.href = `/assets/${id}`)}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold hover:bg-blue-400"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}