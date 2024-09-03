'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {

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
        <MaxWidthWrapper>
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300`}>
                {/* Navbar */}
                <Navbar handleToggle={handleToggle} />

                {/* Main Content */}

                <main className={`pt-16`}>
                    <div className={`p-4 ${isOpen && 'blur-lg lg:blur-none'} lg:blur-none`}>
                        {children}
                    </div>
                </main>


            </div>
        </div>
        </MaxWidthWrapper>
    );
}
