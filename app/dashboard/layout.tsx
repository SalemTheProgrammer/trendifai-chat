"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [session, loading, router]);

  if (loading) return null;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-950 to-purple-950">
      <div className="flex h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
} 