import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardCharts from "./DashboardCharts";
import { cookies } from "next/headers";
import AnalyticsPanel from "@/components/AnalyticsPanel";
export const dynamic = "force-dynamic";


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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-10 space-y-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Stat label="Products" value={stats.totalProducts} trend={+3} />
        <Stat label="Total Stock" value={stats.totalStock} trend={-2} />
        <Stat label="Inventory Value" value={`₹${stats.inventoryValue}`} trend={+5} />
      </div>

      <AnalyticsPanel data={stats} />

    </div>
  );

}

function Stat({ label, value, trend }: any) {
  const isPositive = trend > 0;

  return (
    <div className="relative bg-[#0f172a]/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-transform duration-200 hover:scale-[1.02]">

      <div className="text-sm text-slate-400">{label}</div>

      <div className="mt-1 flex items-end justify-between">
        <div className="text-2xl font-semibold font-mono">{value}</div>

        <div
          className={`text-sm flex items-center gap-1 px-2 py-1 rounded-full
          ${isPositive
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-rose-500/10 text-rose-400"
            }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(trend)}%
        </div>
      </div>
    </div>
  );
}
