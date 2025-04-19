import NextAuth, { DefaultSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/src/server/db";
import { Role } from "./prisma/generated/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    session({ session, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role,
          id: user.id,
        },
      };
    },
  },
  // https://github.com/nextauthjs/next-auth/issues/9493
  adapter: PrismaAdapter(db) as Adapter,
  providers: [GitHub],
});
