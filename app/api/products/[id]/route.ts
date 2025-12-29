export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";
import { ProductSchema } from "@/lib/validators/product";
import { formatZodErrors } from "@/lib/utils/zodErrorMapper";


export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const product = await Product.findById(id);

  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Validate edited data
  const parsed = ProductSchema.safeParse(body);
  if (!parsed.success) {
    const friendlyErrors = formatZodErrors(parsed.error.flatten().fieldErrors);

    return NextResponse.json(
      { error: { fieldErrors: friendlyErrors } },
      { status: 400 }
    );
  }

  await connectDB();

  const updated = await Product.findByIdAndUpdate(id, parsed.data, { new: true });

  return NextResponse.json(updated);
}
