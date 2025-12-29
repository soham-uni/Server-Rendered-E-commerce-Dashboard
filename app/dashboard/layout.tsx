export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <nav className="space-y-2">
          <a href="/dashboard" className="block hover:underline">Dashboard</a>
          <a href="/dashboard/products" className="block hover:underline">Products</a>
          <a href="/dashboard/products/new" className="block hover:underline">Add Product</a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
