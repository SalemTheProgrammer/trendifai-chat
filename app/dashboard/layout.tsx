"use client";

import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white">
      <Sidebar />
      <main className="transition-all duration-300 ease-in-out
        md:ml-64 min-h-screen pt-16 md:pt-4 px-4">
        {children}
      </main>
    </div>
  );
} 