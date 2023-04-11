import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

// https://login.live.com/oauth20_authorize.srf?client_id=33dce5ac-b19a-41a7-8937-280d22cd1af9&scope=openid+offline_access+https%3a%2f%2fgraph.microsoft.com%2fmail.read&redirect_uri=https%3a%2f%2fazure-eqdfr2qxm-cskeleto.vercel.app&response_type=code&state=12345&response_mode=query&uaid=662729c08269458cb42c91d5ede5dc64&msproxy=1&issuer=mso&tenant=common&ui_locales=en-US&epct=PAQABAAEAAAD--DLA3VO7QrddgJg7Wevryw3v-hWQaI3NXAd99QwXrZRgHdwnJCRd61GGIMXeU74GH4DxNf9oxZiIeCGlbsquyn0KjdiazT7KWmI8XeZwbTLa_THz7hYwdxwX4--YCUVt1w3UlCCVO8DLpANpG_4AbTRgFFzppSVnmwRziRIJYiWGMXqmymBlU1b05sXUes1atZk_8SukbAeOjY_RnnPob8JIgAilTyIBEvaCCBWsCiAA&jshs=0
