// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    isProUser?: boolean
  }

  interface Session {
    user: User & {
      id: string
      isProUser: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isProUser?: boolean
  }
}