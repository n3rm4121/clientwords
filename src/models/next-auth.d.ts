// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    isProUser?: boolean
    subscriptionTier?: string
  }

  interface Session {
    user: User & {
      id: string
      isProUser: boolean
      subscriptionTier: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isProUser?: boolean
    subscriptionTier?: string
  }
}