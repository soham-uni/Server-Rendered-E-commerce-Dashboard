import NextAuth, { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db/connect";
import Admin from "@/models/Admin";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();
        const admin = await Admin.findOne({ email: credentials?.email });
        if (!admin) throw new Error("No user");

        const isValid = await bcrypt.compare(credentials!.password, admin.password);
        if (!isValid) throw new Error("Invalid password");

        return admin;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
