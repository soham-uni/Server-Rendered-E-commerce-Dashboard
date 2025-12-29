"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState<any>(null);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/products/${id}`, { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => {
                setForm(data);
                setLoading(false);
            })
            .catch(() => {
                setForm(null);
                setLoading(false);
            });
    }, [id]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setErrors({});

        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
            setErrors(data.error?.fieldErrors || {});
            return;
        }

        router.replace("/dashboard/products");
        router.refresh();
    }

    if (loading) return <div className="p-8">Loading...</div>;
    if (!form) return <div className="p-8">Product not found</div>;

    return (
        <div className="p-8 max-w-lg">
            <h1 className="text-xl font-bold mb-4">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <input
                        className="border p-2 w-full"
                        value={form.name || ""}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                </div>

                <div>
                    <input
                        className="border p-2 w-full"
                        type="number"
                        value={form.price || 0}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}
                </div>

                <div>
                    <input
                        className="border p-2 w-full"
                        type="number"
                        value={form.stock || 0}
                        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    />
                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock[0]}</p>}
                </div>

                <div>
                    <select
                        className="border p-2 w-full"
                        value={form.category || ""}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        {["Electronics", "Stationery", "Furniture", "Clothing", "Home", "Other"].map(
                            (c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            )
                        )}
                    </select>

                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category[0]}</p>
                    )}
                </div>


                <button className="bg-black text-white px-4 py-2 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
