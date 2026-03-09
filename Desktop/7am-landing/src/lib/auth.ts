import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Admin login (env credentials)
    Credentials({
      id: "admin-credentials",
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin-1", name: "Admin", role: "admin" as const };
        }
        return null;
      },
    }),

    // Member login (email + password)
    Credentials({
      id: "member-login",
      name: "Member Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const supabase = createServerSupabaseClient();

        // Find member by email
        const { data: priv } = await supabase
          .from("member_private")
          .select("member_id, name, surname, email, password_hash")
          .eq("email", email)
          .single();

        if (!priv || !priv.password_hash) return null;

        // Verify password
        const valid = await bcrypt.compare(password, priv.password_hash);
        if (!valid) return null;

        // Check member is active
        const { data: member } = await supabase
          .from("members")
          .select("id, status")
          .eq("id", priv.member_id)
          .single();

        if (!member || member.status !== "active") return null;

        return {
          id: String(member.id),
          name: [priv.name, priv.surname].filter(Boolean).join(" ") || "Member",
          email: priv.email,
          role: "member" as const,
          memberId: member.id,
        };
      },
    }),

    // Member magic link (verified via Supabase Auth)
    Credentials({
      id: "member-magic",
      name: "Magic Link",
      credentials: {
        accessToken: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.accessToken) return null;

        const supabase = createServerSupabaseClient();

        // Verify the Supabase access token server-side
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(credentials.accessToken as string);

        if (error || !user?.email) return null;

        // Look up member by email
        const { data: priv } = await supabase
          .from("member_private")
          .select("member_id, name, surname, email")
          .eq("email", user.email)
          .single();

        if (!priv) return null;

        // Check member is active
        const { data: member } = await supabase
          .from("members")
          .select("id, status")
          .eq("id", priv.member_id)
          .single();

        if (!member || member.status !== "active") return null;

        return {
          id: String(member.id),
          name: [priv.name, priv.surname].filter(Boolean).join(" ") || "Member",
          email: priv.email,
          role: "member" as const,
          memberId: member.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = token as any;
        t.role = u.role;
        t.memberId = u.memberId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s = session as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = token as any;
        s.user.role = t.role;
        s.user.memberId = t.memberId;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const role = (auth?.user as any)?.role;

      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnAdminLogin = nextUrl.pathname === "/admin/login";
      const isOnMember = nextUrl.pathname.startsWith("/member");
      const isOnMemberLogin = nextUrl.pathname === "/member/login";
      const isOnMemberCallback =
        nextUrl.pathname === "/member/auth/callback";

      // Admin routes: require admin role
      if (isOnAdmin && !isOnAdminLogin) {
        if (!isLoggedIn || role !== "admin") {
          return Response.redirect(new URL("/admin/login", nextUrl));
        }
      }

      // Member routes: require member role
      if (isOnMember && !isOnMemberLogin && !isOnMemberCallback) {
        if (!isLoggedIn || role !== "member") {
          return Response.redirect(new URL("/member/login", nextUrl));
        }
      }

      return true;
    },
  },
});
