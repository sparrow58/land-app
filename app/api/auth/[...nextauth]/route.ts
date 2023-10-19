import { auth0Options } from "@/lib/nextAuthConfig";
import NextAuth from "next-auth";
const handler = NextAuth(auth0Options);

export { handler as GET, handler as POST };
