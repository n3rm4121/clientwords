'use client'

import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Box, Gem, LayoutDashboard, LogOut, Settings } from 'lucide-react';

export const dashboardNavItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={25} />,
    link: '/dashboard'
  },
  {
    title: 'Spaces',
    icon: <Box size={25} />,
    link: '/dashboard/spaces'
  },
  {
    title: 'Settings',
    icon: <Settings size={25} />,
    link: '/dashboard/settings'
  },

];

function Sidebar({ isFreeAccount, isOpen }: { isFreeAccount?: boolean, isOpen: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className={cn(
      "fixed z-50 top-0 left-0 mt-16 lg:hidden flex flex-col items-start space-y-6 py-4 px-2 shadow-lg transition-all duration-300 h-full overflow-y-auto bg-slate-100 dark:bg-slate-950",
      { 'w-52': isOpen, 'w-0 p-0 m-0': !isOpen }
    )}
    >
      {dashboardNavItems.map((item, index) => {
        const isActive = pathname === item.link || (pathname.startsWith(item.link) && item.link !== '/dashboard');
        return (
          <>
            <Link
              href={item.link}
              key={index}
              className={cn(buttonVariants({ variant: 'ghost' }), "flex gap-4 w-full px-4 py-2 justify-start hover:text-blue-500", {
                'text-blue-500 bg-slate-200 dark:bg-slate-900 ': isActive,
              })}
            >
              <span className="text-2xl">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          </>
        );
      })}
      <Separator />
      {isFreeAccount && (
        <Link href="/dashboard/upgrade" className={cn(buttonVariants({ variant: 'default' }), "flex gap-4 w-full px-4 py-2 justify-start")}>
          <span className="text-2xl">
            <Gem size={25} />
          </span>
          <span>Upgrade to Pro</span>
        </Link>
      )}
      <Button variant='ghost' className='flex items-center gap-4 hover:text-red-500' onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
        <span className="text-2xl">
          <LogOut size={25} />
        </span>
        <span>Sign Out</span>
      </Button>
    </div>
  );
}


export default Sidebar;
