"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewAssetPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Camera");
  const [condition, setCondition] = useState("Good");
  const [status, setStatus] = useState("Active");
  const handleCreateAsset = async () => {
    if (!name.trim()) {
      alert("Please enter an asset name.");
      return;
    }

    const provenId = `PRV-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please sign in first.");
      window.location.href = "/login";
      return;
    }

    const { data: newAsset, error } = await supabase
      .from("assets")
      .insert({
        user_id: user.id,
        proven_id: provenId,
        name: name.trim(),
        category,
        condition,
        status,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    const { error: eventError } = await supabase
      .from("asset_events")
      .insert({
        asset_id: newAsset.id,
        user_id: user.id,
        event_type: "registration",
        title: "Asset registered",
        description: "Asset identity created and registered in PROVEN.",
      });

    if (eventError) {
      console.error(eventError);
      alert(eventError.message);
      return;
    }

    const { error: conditionEventError } = await supabase
      .from("asset_events")
      .insert({
        asset_id: newAsset.id,
        user_id: user.id,
        event_type: "condition",
        title: "Initial condition recorded",
        description: `Initial condition recorded as ${condition}.`,
      });

      if (conditionEventError) {
        console.error(conditionEventError);
        alert(conditionEventError.message);
        return;
      }

    window.location.href = "/assets";
  };
   

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        {/* Header */}
        <div className="mb-10">
          <a
            href="/assets"
            className="text-sm text-slate-500 hover:text-white"
          >
            ← Back to assets
          </a>

          <p className="mt-8 text-sm text-slate-500">Asset registry</p>

          <h1 className="mt-2 text-3xl font-bold">
            Add a new asset
          </h1>

          <p className="mt-2 text-slate-400">
            Create a PROVEN identity for a physical asset.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 md:p-8">
          <div className="space-y-6">
            {/* Asset name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Asset name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Canon EOS R6"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-400"
              >
                <option value="Camera">Camera</option>
                <option value="Stabilizer">Stabilizer</option>
                <option value="Computer">Computer</option>
                <option value="Audio">Audio</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Condition
              </label>

              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-400"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-400"
              >
                <option value="Active">Active</option>
                <option value="Rented">Rented</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Needs attention">Needs attention</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
              <a
                href="/assets"
                className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Cancel
              </a>

              <button
                type="button"
                onClick={handleCreateAsset}
                className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold hover:bg-blue-400"
              >
                Create asset
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}