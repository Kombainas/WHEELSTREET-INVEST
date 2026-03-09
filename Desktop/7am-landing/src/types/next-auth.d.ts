import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role: "admin" | "member";
      memberId?: number;
    };
  }
  interface User {
    role: "admin" | "member";
    memberId?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "admin" | "member";
    memberId?: number;
  }
}
