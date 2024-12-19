'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/dashboard/components/Navbar';
import { useSession } from 'next-auth/react';
import ToastProvider from '@/components/ToastProvider';
import { getUserSubscriptionTier } from './action';


export default function Layout({ children }: { children: React.ReactNode }) {
    const session = useSession();

    const [isAccountFree, setIsAccountFree] = useState(false);

    useEffect(() => {
        const fetchSubscriptionTier = async () => {
            const subscriptionTier = await getUserSubscriptionTier(session.data?.user?.id as string);
            setIsAccountFree(subscriptionTier === 'Free');
        };
        fetchSubscriptionTier();
    })
    return (
        <div className="flex min-h-screen">
            <ToastProvider />
            <div className={`flex-1 transition-all duration-300`}>
                <Navbar isAccountFree={isAccountFree} />
                <main className={`pt-16`}>
                    <div className={`p-4`}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
