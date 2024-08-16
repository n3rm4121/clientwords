'use client'
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} />
            
            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-44' : 'ml-0'}`}>
                {/* Navbar */}
                <Navbar handleToggle={handleToggle} />
                
                {/* Main Content */}
                <main className="pt-16">
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
