export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  // AUTH GUARD
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const products = await Product.find();

  const totalProducts = products.length;
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const inventoryValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  const byCategory: any = {};
  products.forEach((p) => {
    byCategory[p.category || "Uncategorized"] =
      (byCategory[p.category || "Uncategorized"] || 0) + p.stock;
  });

  const topProducts = products
  .map((p) => ({
    name: p.name,
    value: p.price * p.stock,
  }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 5);

const revenueTrend = [
  { month: "Jan", revenue: Math.round(inventoryValue * 0.4) },
  { month: "Feb", revenue: Math.round(inventoryValue * 0.5) },
  { month: "Mar", revenue: Math.round(inventoryValue * 0.45) },
  { month: "Apr", revenue: Math.round(inventoryValue * 0.6) },
  { month: "May", revenue: Math.round(inventoryValue * 0.75) },
  { month: "Jun", revenue: inventoryValue },
];

return NextResponse.json({
  totalProducts,
  totalStock,
  inventoryValue,
  byCategory,
  topProducts,
  revenueTrend,
});

}
