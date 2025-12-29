"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
export const dynamic = "force-dynamic";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setForm(data);
        setImages(data.images || []);
        setLoading(false);
      })
      .catch(() => {
        setForm(null);
        setLoading(false);
      });
  }, [id]);

  async function handleImageUpload(files: FileList | null) {
    if (!files) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      setImages((prev) => [...prev, data.url]);
    }

    setUploading(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setErrors({});

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data.error?.fieldErrors || {});
      return;
    }

    router.replace("/dashboard/products");
    router.refresh();
  }

  if (loading) return <div className="p-10 text-slate-400">Loading…</div>;
  if (!form) return <div className="p-10 text-red-400">Product not found</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
      <div className="max-w-xl mx-auto space-y-6">

        <h1 className="text-2xl font-semibold">Edit Product</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6"
        >

          {/* Name */}
          <div>
            <input
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Product Name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>}
          </div>

          {/* Price */}
          <div>
  <input
    className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2"
    type="number"
    value={form.price === 0 ? "" : form.price}
    onChange={(e) => {
      const val = e.target.value;
      setForm({ ...form, price: val === "" ? "" : Number(val) });
    }}
    placeholder="Price"
  />
  {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price[0]}</p>}
</div>


          {/* Stock */}
          <div>
            <input
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2"
              type="number"
              value={form.stock || 0}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              placeholder="Stock"
            />
            {errors.stock && <p className="text-red-400 text-sm mt-1">{errors.stock[0]}</p>}
          </div>

          {/* Category */}
          <div>
            <select
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {["Electronics", "Stationery", "Furniture", "Clothing", "Home", "Other"].map(
                (c) => (
                  <option key={c} value={c}>{c}</option>
                )
              )}
            </select>
            {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category[0]}</p>}
          </div>

          {/* Images */}
          <div className="space-y-3">
            <label className="text-sm text-slate-400">Product Images</label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="file-edit"
                className="cursor-pointer bg-slate-800 hover:bg-slate-700 transition px-4 py-2 rounded-lg text-sm border border-slate-700"
              >
                Upload Images
              </label>

              <span className="text-sm text-slate-400">{images.length} image(s)</span>

              <input
                id="file-edit"
                type="file"
                multiple
                hidden
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </div>

            {uploading && <p className="text-sm text-slate-400">Uploading…</p>}

            <div className="flex gap-3 flex-wrap">
              {images.map((url, i) => (
                <div key={i} className="relative group">
                  <img
                    src={url}
                    className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-black/70 text-white text-xs rounded px-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-emerald-400 text-black py-2 rounded-lg font-medium hover:bg-emerald-300 transition">
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}
