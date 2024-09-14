import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "./lib/dbConnect";
import User from "./models/user.model";
import bcrypt from 'bcryptjs';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider,
    GoogleProvider,

  ],

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },
  
  callbacks: {
    jwt: async ({ token, user }) => {

      if (user) {
        await dbConnect();
        const dbUser = await User.findOne({email: user.email});

        token.id = dbUser._id;
        token.email = user.email;
        token.name = dbUser.name;
        token.image = dbUser.image;
        token.isProUser = dbUser.isProUser;
        token.SubscriptionTier = dbUser.SubscriptionTier
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user.id = token.id as string;    
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      session.user.isProUser = token.isProUser as boolean;
      session.user.subscriptionTier = token.SubscriptionTier as string;
      return session;
    },

    signIn: async ({ user, account }) => {
      await dbConnect();
    
      const { email, name, image } = user;
      const providerAccountId = account?.providerAccountId as string;
      const provider = account?.provider as string;
    
      try {
        let existingUser = await User.findOne({ email });
    
        if (existingUser) {
          // Check if this OAuth provider is already linked
         
            const oauthAccount = existingUser.oauthAccounts.find( (acc: { provider: string; providerAccountId: string; }) => acc.provider === provider && acc.providerAccountId === providerAccountId);

          if (!oauthAccount) {
            // Add new OAuth provider to the existing user
            existingUser.oauthAccounts.push({ provider, providerAccountId });
            await existingUser.save();
          }
    
        } else {
          // Create a new user with the OAuth account
          existingUser = new User({
            email,
            name,
            image,
            isVerified: true,
            oauthAccounts: [{ provider, providerAccountId }],
          });
          await existingUser.save();
        }
    
        return true;
    
      } catch (error) {
        console.log("Error during OAuth sign-in:", error);
        return false;
      }
    },
    
  },
});