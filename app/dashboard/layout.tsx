import Link from "next/link";
import GlobalSearch from "@/components/GlobalSearch";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productsRes = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await productsRes.json();

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#0b0e14] text-zinc-100">

      {/* Sidebar */}
      <aside className="w-full sm:w-64 bg-slate-900/50 backdrop-blur border-b sm:border-b-0 sm:border-r border-slate-800 flex flex-col p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-emerald-400">
          AdminPanel
        </h2>

        <nav className="mt-6 sm:mt-10 flex flex-row sm:flex-col gap-2 text-sm overflow-x-auto">
          <NavItem href="/dashboard">Dashboard</NavItem>
          <NavItem href="/dashboard/products">Products</NavItem>
          <NavItem href="/dashboard/products/new">Add</NavItem>
          <NavItem href="/dashboard/admins">Admins</NavItem>
        </nav>

        <div className="hidden sm:block mt-auto pt-8 border-t border-zinc-800">
          <form action="/api/auth/signout" method="post">
            <button className="w-full text-left text-red-400 hover:text-red-300 transition">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-10 border-b border-slate-800 bg-slate-900/40 backdrop-blur">
          <GlobalSearch products={products} />
          <div className="hidden sm:block text-sm text-slate-400">Admin</div>
        </header>

        {/* Main */}
        <main className="flex-1 px-4 py-6 sm:p-10 overflow-y-auto bg-gradient-to-br from-slate-950 to-slate-900">
          {children}
        </main>

      </div>
    </div>
  );
}

function NavItem({ href, children }: any) {
  return (
    <Link
      href={href}
      className="whitespace-nowrap px-3 py-2 rounded-md text-slate-300 hover:text-slate-100 hover:bg-slate-800/40 transition-all"
    >
      {children}
    </Link>
  );
}
