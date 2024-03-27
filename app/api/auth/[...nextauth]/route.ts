import { authOptions } from "@/services/auth.service";
import NextAuth, { AuthOptions } from "next-auth";
const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
