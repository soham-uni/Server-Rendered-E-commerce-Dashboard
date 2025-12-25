import { connectDB } from "@/lib/db/connect";

export default async function Page() {
  await connectDB();

  return (
    <main className="p-10 text-xl font-bold">
      Database Connected
    </main>
  );
}
