import { DefaultUser, type DefaultSession, type User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}
