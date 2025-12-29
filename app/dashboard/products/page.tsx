export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActionButtons from "@/components/ActionButtons";
import { cookies } from "next/headers";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  const products = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-10 space-y-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Products</h1>
        <a
          href="/dashboard/products/new"
          className="bg-emerald-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-emerald-300 transition text-center"
        >
          + Add Product
        </a>
      </div>

      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl overflow-x-auto">

        <table className="w-full text-sm min-w-[720px]">
          <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr
                key={p._id}
                className="border-b border-slate-800 hover:bg-slate-900/40 transition"
              >
                <td className="p-4">
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                </td>
                <td className="p-4 font-medium whitespace-nowrap">{p.name}</td>
                <td className="p-4 whitespace-nowrap">₹{p.price}</td>
                <td className="p-4">
                  <StockBadge stock={p.stock} />
                </td>
                <td className="p-4 whitespace-nowrap">{p.category}</td>
                <td className="p-4">
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

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return <span className="px-2 py-1 rounded-full text-xs bg-rose-500/10 text-rose-400">Out of stock</span>;

  if (stock < 10)
    return <span className="px-2 py-1 rounded-full text-xs bg-amber-400/10 text-amber-400">Low stock</span>;

  return <span className="px-2 py-1 rounded-full text-xs bg-emerald-400/10 text-emerald-400">In stock</span>;
}
