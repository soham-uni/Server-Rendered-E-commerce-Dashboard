import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db/connect";
import Admin from "@/models/Admin";

export const dynamic = "force-dynamic";

export default async function AdminsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();
  const admins = await Admin.find().lean();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-10 space-y-10">

      <h1 className="text-3xl font-semibold">Admins</h1>

      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a: any) => (
              <tr key={a._id} className="border-b border-slate-800 hover:bg-slate-900/40 transition">
                <td className="p-4">{a.name}</td>
                <td className="p-4 text-slate-400">{a.email}</td>
                <td className="p-4 text-slate-500">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
