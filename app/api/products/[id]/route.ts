export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db/connect";
import Product from "@/models/Product";

export async function GET(_: Request, { params }: any) {
  const conn = await connectDB();

  const dbName = conn.connection.name;
  const collections = Object.keys(conn.connection.collections);

  const product = await conn.connection
    .collection("products")
    .findOne({ _id: new (require("mongoose").Types.ObjectId)(params.id) });

  return NextResponse.json({
    dbName,
    collections,
    rawQueryResult: product,
  });
}


export async function PUT(req: Request, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  await connectDB();

  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });

  return NextResponse.json(updated);
}
