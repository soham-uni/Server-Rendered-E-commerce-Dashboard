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

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

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
    <div className="p-8 max-w-lg">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <input
            className="border p-2 w-full"
            placeholder="Product Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>

        <div>
          <input
            className="border p-2 w-full"
            placeholder="Price"
            type="number"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}
        </div>

        <div>
          <input
            className="border p-2 w-full"
            placeholder="Stock"
            type="number"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock[0]}</p>}
        </div>

        <div>
          <select
            className="border p-2 w-full"
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
          {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
        </div>

        <div className="space-y-2">
          <input
            type="file"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
          />

          {uploading && <p>Uploading images...</p>}

          <div className="flex gap-2 flex-wrap">
            {images.map((url) => (
              <img
                key={url}
                src={url}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
}
