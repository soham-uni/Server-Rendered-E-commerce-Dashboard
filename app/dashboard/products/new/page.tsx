"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

export default function NewProduct() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", price: "", stock: "", category: "" });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<any>({});

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

    const res = await fetch("/api/products", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        images,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data.error?.fieldErrors || {});
      return;
    }

    router.push("/dashboard/products");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
      <div className="max-w-xl mx-auto space-y-6">

        <h1 className="text-2xl font-semibold">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6"
        >

          {/* Fields */}
          {["name", "price", "stock"].map((field) => (
            <div key={field}>
              <input
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2"
                type={field === "name" ? "text" : "number"}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
              {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field][0]}</p>}
            </div>
          ))}

          {/* Category */}
          <div>
            <select
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {["Electronics", "Stationery", "Furniture", "Clothing", "Home", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category[0]}</p>}
          </div>

          {/* Images */}
          <div className="space-y-3">
            <label className="block text-sm text-slate-400">Product Images</label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-slate-800 hover:bg-slate-700 transition px-4 py-2 rounded-lg text-sm border border-slate-700"
              >
                Select Images
              </label>

              <span className="text-sm text-slate-400">
                {images.length > 0 ? `${images.length} file(s) selected` : "No files selected"}
              </span>

              <input
                id="file-upload"
                type="file"
                multiple
                hidden
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </div>

            {uploading && <p className="text-sm text-slate-400">Uploading images…</p>}

            <div className="flex gap-3 flex-wrap mt-2">
              {images.map((url) => (
                <img
                  key={url}
                  src={url}
                  className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                />
              ))}
            </div>
          </div>


          <button className="w-full bg-emerald-400 text-black py-2 rounded font-medium hover:bg-emerald-300 transition">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
