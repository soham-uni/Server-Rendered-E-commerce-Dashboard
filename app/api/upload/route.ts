export const runtime = "nodejs";

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.formData();
    const file = data.get("file") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const res: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "products" }, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
            .end(buffer);
    });

    return NextResponse.json({ url: res.secure_url });
}
