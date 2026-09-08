"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditAssetPage() {
  const params = useParams();
  const id = params.id;

  const [asset, setAsset] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Camera");
  const [condition, setCondition] = useState("Good");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const storedAssets = localStorage.getItem("proven-assets");

    if (storedAssets) {
      const assets = JSON.parse(storedAssets);

      const foundAsset = assets.find(
        (storedAsset) => storedAsset.id === id
      );

      if (foundAsset) {
        setAsset(foundAsset);
        setName(foundAsset.name);
        setCategory(foundAsset.category);
        setCondition(foundAsset.condition);
        setStatus(foundAsset.status);
      }
    }
  }, [id]);

  const handleSave = () => {
    const storedAssets = localStorage.getItem("proven-assets");

    if (!storedAssets) {
      return;
    }

    const assets = JSON.parse(storedAssets);

    const updatedAssets = assets.map((storedAsset) => {
      if (storedAsset.id === id) {
        return {
          ...storedAsset,
          name,
          category,
          condition,
          status,
          updated: "Just now",
        };
      }

      return storedAsset;
    });

    localStorage.setItem(
      "proven-assets",
      JSON.stringify(updatedAssets)
    );

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
            {asset.id}
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