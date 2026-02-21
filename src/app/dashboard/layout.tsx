'use client'
import React from 'react';
import Sidebar from "@/app/components/dashboard/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 relative">
                <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
                    <span className="text-[20rem]">🌿</span>
                </div>
                <div className="relative z-10 px-12 pt-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}