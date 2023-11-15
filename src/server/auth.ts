import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/lib/firebase/firebaseInit";
import { doc, getDoc } from "firebase/firestore";

interface User {
  user: string;
  pass: string;
}

export interface Admins {
  admins: User[];
}

export function checkAuthNot(
  user: string,
  pass: string,
  adminsDB: Admins,
): boolean {
  for (const iterator of adminsDB.admins) {
    if (iterator.user === user && iterator.pass === pass) {
      return false;
    }
  }
  return true;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { pubKey, password } = credentials as {
          pubKey: string;
          password: string;
        };

        const docRef = doc(db, "admin_panel", "admin");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          return null;
        }

        const fireData = docSnap.data() as Admins;

        if (checkAuthNot(pubKey, password, fireData)) {
          throw new Error("invalid credentials");
        }

        return {
          email: pubKey,
          name: pubKey,
          image: pubKey,
          role: "admin",
          id: pubKey,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
