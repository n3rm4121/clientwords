import { Inter as FontSans } from "next/font/google"
import "./styles/globals.css"
import type { Metadata } from "next";
import { cn } from '../lib/utils'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "ClientWords - Amplify Your Success with Customer Words",
  description: "Elevate your business credibility with CustomerWords - the smart way to collect, manage, and showcase powerful customer testimonials",
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
          <TooltipProvider>
            <ToastContainer />
        {children}
        </TooltipProvider>
        </SessionProvider>
        </ThemeProvider>
        <Analytics/>
        <SpeedInsights/>
          
      </body>
    </html>
  )
}
