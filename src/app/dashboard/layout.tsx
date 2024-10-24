'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ToastProvider from '@/components/ToastProvider';
import { getUserSubscriptionTier } from './action';


export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const session = useSession();

    const [isAccountFree, setIsAccountFree] = useState(false);

    useEffect(() => {
        const fetchSubscriptionTier = async () => {
            const subscriptionTier = await getUserSubscriptionTier(session.data?.user?.id as string);
            setIsAccountFree(subscriptionTier === 'Free');
        };
        fetchSubscriptionTier();
    })



    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex min-h-screen">
            <ToastProvider />

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} isFreeAccount={isAccountFree} />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300`}>
                {/* Navbar */}
                <Navbar handleToggle={handleToggle} isAccountFree={isAccountFree} />

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
