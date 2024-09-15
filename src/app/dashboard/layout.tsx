'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ToastProvider from '@/components/ToastProvider';


export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const session = useSession();
    
   
    useEffect(() => {
        const handleScrollRestoration = () => {
          const scrollPos = sessionStorage.getItem(pathname);
          if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos, 10));
          } else {
            window.scrollTo(0, 0);
          }
        };
    
        handleScrollRestoration();
    
        return () => {
        sessionStorage.setItem(pathname, window.scrollY.toString());
        };
      }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth >= 1024);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex min-h-screen">
            <ToastProvider /> 

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300`}>
                {/* Navbar */}
                <Navbar handleToggle={handleToggle} />

                {/* Main Content */}

                <main className={`pt-16`}>
                    <div className={`p-4`}>
                        {children}
                    </div>
                </main>


            </div>
        </div>
    );
}
