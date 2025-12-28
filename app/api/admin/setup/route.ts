export const runtime = "nodejs";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db/connect";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  const { name, email, password, key } = await req.json();

  if (key !== process.env.ADMIN_SETUP_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const exists = await Admin.findOne({});
  if (exists) {
    return NextResponse.json({ error: "Admin already exists" }, { status: 403 });
  }

  const hash = await bcrypt.hash(password, 10);

  await Admin.create({ name, email, password: hash });

  return NextResponse.json({ success: true });
}
