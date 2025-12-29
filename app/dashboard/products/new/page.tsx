"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
        >
          {/* Name */}
          <div>
            <input
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2"
              placeholder="Product Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>}
          </div>

          {/* Price */}
          <div>
            <input
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2"
              type="number"
              placeholder="Price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price[0]}</p>}
          </div>

          {/* Stock */}
          <div>
            <input
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2"
              type="number"
              placeholder="Stock"
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            {errors.stock && <p className="text-red-400 text-sm mt-1">{errors.stock[0]}</p>}
          </div>

          {/* Category */}
          <div>
            <select
              className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {["Electronics", "Stationery", "Furniture", "Clothing", "Home", "Other"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">{errors.category[0]}</p>
            )}
          </div>

          {/* Images */}
          <div className="space-y-2">
            <input type="file" multiple onChange={(e) => handleImageUpload(e.target.files)} />

            {uploading && <p className="text-sm text-zinc-400">Uploading images...</p>}

            <div className="flex gap-3 flex-wrap">
              {images.map((url) => (
                <img
                  key={url}
                  src={url}
                  className="w-20 h-20 object-cover rounded border border-zinc-700"
                />
              ))}
            </div>
          </div>

          <button className="w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
