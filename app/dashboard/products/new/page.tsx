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

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
      }),
    });

    router.push("/dashboard/products");
  }

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Stock"
          type="number"
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
}
