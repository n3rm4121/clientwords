'use client'
import React from "react";
import Link from "next/link";
import ModeToggle from "../../../components/toggleThemeBtn";
import { MaxWidthWrapper } from "../../../components/MaxWidthWrapper";
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
    <MaxWidthWrapper>
      <nav className="fixed border-b border-gray-200 bg-gray-900 backdrop-filter backdrop-blur-lg inset-x-0 top-0 z-50 w-full h-16  flex items-center justify-between px-4">
        <div className="flex  justify-center text-center gap-3">
          <div className="flex justify-center gap-4 items-center h-16">
            <div className="relative inline-flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            {isAccountFree && (
              <Link href="/#pricing" target="_blank" className="hidden md:flex">
                <Button>
                  Upgrade to Pro
                  <Gem className="ml-2" size={18} />
                </Button>
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src={user?.image ?? "/user.png"}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut()}>Sign Out</DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAccountFree && (
                  <Link href="/#pricing" target="_blank" className="inline-block md:hidden">
                    <Button>
                      Upgrade to Pro
                      <Gem className="ml-2" size={18} />
                    </Button>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </div>
      </nav>
    </MaxWidthWrapper>

  );
}
