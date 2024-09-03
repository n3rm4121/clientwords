'use client'
import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import ModeToggle from "../toggleThemeBtn";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { dashboardNavItems } from "./Sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar({ handleToggle }: { handleToggle: () => void }) {
    const pathname = usePathname();
    return (
        <MaxWidthWrapper>
        <nav className="fixed border-b border-gray-200 backdrop-filter backdrop-blur-lg inset-x-0 top-0 z-50 w-full h-16  flex items-center justify-between px-4">
            <div className="flex  justify-center text-center gap-3">
                <div className="cursor-pointer items-center justify-center flex lg:hidden" onClick={handleToggle}><FaBars /></div>
                <Link href='/' className="text-xl font-semibold text-center">TestiBoost</Link>

                <div  className="hidden lg:flex items-center justify-center  gap-4">
                {dashboardNavItems.map((item, index) => {
                    const isActive = pathname === item.link;
                    return (
                        <Link href={item.link} key={index} className={cn('px-4 py-2 hover:text-muted-foreground', {'text-blue-500': isActive,})}>
                            {item.title}
                        </Link>
                    );
                }
                )}
            </div>
            </div>

           
            <ModeToggle />
        </nav>
        </MaxWidthWrapper>
        
    );
}
