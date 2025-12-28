export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import { productSchema } from "@/lib/validators/product";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 });
  }

  await connectDB();

  const product = await Product.create(parsed.data);
  return NextResponse.json(product);
}

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({createdAt: -1});
  return NextResponse.json(products);
}
