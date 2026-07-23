'use client'
import React from "react";
import Link from "next/link";
import ModeToggle from "../../../components/toggleThemeBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Gem } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar({ isAccountFree }: { isAccountFree?: boolean }) {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border/60 bg-gray-900 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src='/newbrand1.png' width={160} height={40} alt='ClientWords' />
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {isAccountFree && (
            <Link href="/#pricing" target="_blank" className="hidden md:block">
              <Button size="sm" className="gap-1.5">
                Upgrade to Pro
                <Gem size={14} />
              </Button>
            </Link>
          )}

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 overflow-hidden ring-2 ring-border hover:ring-primary transition-all">
                <Image
                  src={user?.image ?? "/user.png"}
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm">{user?.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                Sign Out
              </DropdownMenuItem>
              {isAccountFree && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="md:hidden">
                    <Link href="/#pricing" target="_blank">
                      Upgrade to Pro
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
