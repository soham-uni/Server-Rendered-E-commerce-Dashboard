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

  return NextResponse.json({
    totalProducts,
    totalStock,
    inventoryValue,
    byCategory,
  });
}
