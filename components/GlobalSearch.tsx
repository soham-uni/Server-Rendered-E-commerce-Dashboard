"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GlobalSearch({ products }: any) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = products.filter((p: any) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-80">
      <input
        placeholder="Search products..."
        className="w-full px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-emerald-400"
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="absolute mt-2 w-full bg-[#0f172a] border border-slate-800 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
          {filtered.map((p: any) => (
            <div
              key={p._id}
              onClick={() => router.push(`/dashboard/products/${p._id}/edit`)}
              className="px-3 py-2 cursor-pointer hover:bg-slate-800 transition"
            >
              {p.name}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-3 py-3 text-slate-500 text-sm">No results</div>
          )}
        </div>
      )}
    </div>
  );
}
