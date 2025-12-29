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
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Products" value={stats.totalProducts} />
        <Stat label="Total Stock" value={stats.totalStock} />
        <Stat label="Inventory Value" value={`₹${stats.inventoryValue}`} />
      </div>

      <DashboardCharts data={stats.byCategory} />
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="border p-4 rounded">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
