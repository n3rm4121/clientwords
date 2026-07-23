'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/dashboard/components/Navbar';
import { useSession } from 'next-auth/react';
import ToastProvider from '@/components/ToastProvider';
import { getUserSubscriptionTier } from './action';
import Unauthorized from '@/components/Unauthorized';

export default function Layout({ children }: { children: React.ReactNode }) {
    const session = useSession();
    const [isAccountFree, setIsAccountFree] = useState(false);

    useEffect(() => {
        const fetchSubscriptionTier = async () => {
            const subscriptionTier = await getUserSubscriptionTier(session.data?.user?.id as string);
            setIsAccountFree(subscriptionTier === 'Free');
        };
        fetchSubscriptionTier();
    }, [session.data?.user?.id]);

    if (session.status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin h-8 w-8 rounded-full border-[3px] border-current border-t-transparent text-primary" />
            </div>
        );
    }

    if (!session.data) {
        return <Unauthorized />;
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <ToastProvider />
            <Navbar isAccountFree={isAccountFree} />
            <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
