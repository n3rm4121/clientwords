'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import ModeToggle from "../toggleThemeBtn";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { dashboardNavItems } from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Gem } from "lucide-react";


export default function Navbar({ handleToggle, isAccountFree }: { isAccountFree?: boolean, handleToggle: () => void }) {
  const session = useSession();
  const user = session.data?.user;
  const pathname = usePathname();
  const router = useRouter();


  return (
    <MaxWidthWrapper>
      <nav className="fixed border-b border-gray-200 bg-[#212121] text-white backdrop-filter backdrop-blur-lg inset-x-0 top-0 z-50 w-full h-16  flex items-center justify-between px-4">
        <div className="flex  justify-center text-center gap-3">
          <div className="cursor-pointer items-center justify-center flex lg:hidden" onClick={handleToggle}><FaBars /></div>
          <div className="flex justify-center gap-4 items-center h-16">
            <div className="relative inline-flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center  gap-4">
          {dashboardNavItems.map((item, index) => {
            const isActive = pathname === item.link || (pathname.startsWith(item.link) && item.link !== '/dashboard');
            return (
              <Link href={item.link} key={index} className={cn('px-4 py-2 hover:text-muted-foreground', { 'text-blue-500': isActive, })}>
                {item.title}
              </Link>
            );
          }
          )}

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
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <ModeToggle /> */}
          </div>
        </div>
      </nav>
    </MaxWidthWrapper>

  );
}
