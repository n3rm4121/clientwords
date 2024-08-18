'use client'
import React from 'react';
import { FaCog } from 'react-icons/fa';
import { FaRegMessage } from "react-icons/fa6";
import { TbSpaces } from "react-icons/tb";
import { GoSignOut } from 'react-icons/go';
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  {
    title: 'Dashboard',
    icon: <MdOutlineSpaceDashboard size={30} />,
    link: '/dashboard'
  },
  {
    title: 'Spaces',
    icon: <TbSpaces size={30} />,  
    link: '/dashboard/spaces'
  },
  {
    title: 'Testimonials',
    icon: <FaRegMessage />,
    link: '/dashboard/testimonial'
  },
  {
    title: 'Settings',
    icon: <FaCog />,
    link: '/dashboard/settings'
  }
];

function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <div className={cn(
        "fixed bg-gray-800 z-50 top-0 left-0 mt-16 flex flex-col items-start space-y-6 py-4 px-2 shadow-lg transition-all duration-300 h-full overflow-y-auto", 
        isOpen ? 'lg:w-44 ' : 'w-0 px-0'
      )}
    >
      {items.map((item, index) => {
        const isActive = pathname === item.link;
        return (
          <Link
            href={item.link}
            key={index}
            className={cn(buttonVariants({ variant: 'ghost' }), "flex gap-4 w-full px-4 py-2 justify-start hover:text-blue-500", {
              'text-blue-500 bg-gray-200': isActive,
              'text-gray-700': !isActive,
            })}
          >
            <span className="text-2xl">
              {item.icon}
            </span>
            <span>{item.title}</span>
          </Link>
        );
      })}
      <div className="border-t-2 border-gray-700 w-full"></div>
      <Button variant='ghost' className='flex items-center gap-4 hover:text-red-500' onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
        <span className="text-2xl">
          <GoSignOut />
        </span>
        <span className=''>Sign Out</span>
      </Button>
    </div>
  );
}

export default Sidebar;
