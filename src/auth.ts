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
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Both email and password are required");
        }

        await dbConnect();

        const user = await User.findOne({ email }).select('+password');

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = bcrypt.compare(password, user.password);


        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  pages: {
    signIn: "/auth/login",
  },
  
  callbacks: {
    jwt: async ({ token, user }) => {
      
      if (user) {
        await dbConnect();
        const dbUser = await User.findOne({email: user.email});
        console.log("dbUser", dbUser);
        token.id = user.id;
        token.email = user.email;
        token.name = dbUser.name;
        token.image = dbUser.image;
        

      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      return session;
    },

    signIn: async ({ user, account }) => {
      await dbConnect();

      if (account?.provider === 'google' || account?.provider === 'github') {
        const { email, name, image, id } = user;

        try {
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            const newUser = new User({
              email,
              authProviderId: id,
              authProvider: account.provider as string,
              name,
              image,
              isVerified: true,
            });
            await newUser.save();

          }

          return true;

        } catch (error) {
          console.log("Error during OAuth sign-in:", error);
          return false;
        }

      } else if (account?.provider === 'credentials') {
        return true;
      } else {
        return false;
      }
    },
  },
});
