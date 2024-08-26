import { Inter as FontSans } from "next/font/google"
import "./styles/globals.css"
import type { Metadata } from "next";
import { cn } from '../lib/utils'
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: "TestiBoost - Amplify Your Success with Customer Stories",
  description: "Elevate your business credibility with TestiBoost - the smart way to collect, manage, and showcase powerful customer testimonials",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <SessionProvider>
        {children}
        </SessionProvider>
        </ThemeProvider>
          
      </body>
    </html>
  )
}
