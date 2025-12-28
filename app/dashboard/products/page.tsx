export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ActionButtons from "./ActionButtons";


export default async function ProductsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
    const products = await res.json();

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Products</h1>

            <table className="border w-full">
                <thead>
                    <tr className="border">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Stock</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p: any) => (
                        <tr key={p._id}>
                            <td className="border p-2">{p.name}</td>
                            <td className="border p-2">{p.price}</td>
                            <td className="border p-2">{p.stock}</td>
                            <td className="border p-2">{p.category}</td>
                            <td className="border p-2">
                                <ActionButtons id={p._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}
