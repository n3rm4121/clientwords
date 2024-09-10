'use client'
import React from "react";
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
import { Badge } from "../ui/badge";
import { Gem } from "lucide-react";


export default function Navbar({ isProUser, handleToggle }: { isProUser: boolean, handleToggle: () => void }) {
  const session = useSession();
  const user = session.data?.user;
  const pathname = usePathname();
  const router = useRouter();


  return (
    <MaxWidthWrapper>
      <nav className="fixed border-b border-gray-200 backdrop-filter backdrop-blur-lg inset-x-0 top-0 z-50 w-full h-16  flex items-center justify-between px-4">
        <div className="flex  justify-center text-center gap-3">
          <div className="cursor-pointer items-center justify-center flex lg:hidden" onClick={handleToggle}><FaBars /></div>
          <div className="flex justify-center gap-4 items-center h-16">
            <div className="relative inline-flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src='/brand.png' width={200} height={200} alt='ClientWords' />
              </Link>
              {/* <Badge variant={'secondary'} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                Beta
              </Badge> */}
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
            {!isProUser && (
              <Button className="hidden md:flex" onClick={() => router.push('/upgrade')}>
                Upgrade to Pro
                <Gem className="ml-2" size={18} />
              </Button>
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
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </div>
      </nav>
    </MaxWidthWrapper>

  );
}
