import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardCharts from "./DashboardCharts";
import { cookies } from "next/headers";


export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

const cookieStore = await cookies();

const cookieHeader = cookieStore
  .getAll()
  .map((c) => `${c.name}=${c.value}`)
  .join("; ");

const res = await fetch(`${process.env.NEXTAUTH_URL}/api/analytics`, {
  headers: {
    Cookie: cookieHeader,
  },
  cache: "no-store",
});



  const stats = await res.json();

  return (
  <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10 space-y-10">
    <h1 className="text-3xl font-semibold">Dashboard</h1>

    <div className="grid grid-cols-3 gap-6">
      <Stat label="Products" value={stats.totalProducts} />
      <Stat label="Total Stock" value={stats.totalStock} />
      <Stat label="Inventory Value" value={`₹${stats.inventoryValue}`} />
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Inventory Analytics</h2>
      <DashboardCharts data={stats.byCategory} />
    </div>
  </div>
);

}

function Stat({ label, value }: any) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
