export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ActionButtons from "@/components/ActionButtons";



export default async function ProductsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const products = await res.json();

    return (
  <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Products</h1>
      <a
        href="/dashboard/products/new"
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
      >
        + Add Product
      </a>
    </div>

    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-zinc-300">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p: any) => (
            <tr
              key={p._id}
              className="border-t border-zinc-800 hover:bg-zinc-900 transition"
            >
              <td className="px-4 py-3">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    className="w-14 h-14 object-cover rounded border border-zinc-700"
                  />
                ) : (
                  <div className="w-14 h-14 bg-zinc-800 rounded flex items-center justify-center text-zinc-500 text-xs">
                    No Image
                  </div>
                )}
              </td>

              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3">₹{p.price}</td>
              <td className="px-4 py-3">{p.stock}</td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded bg-zinc-800 text-xs">
                  {p.category}
                </span>
              </td>

              <td className="px-4 py-3">
                <ActionButtons id={p._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
