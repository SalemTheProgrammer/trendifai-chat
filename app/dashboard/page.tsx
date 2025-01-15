"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Sidebar, Agent, agents } from "@/components/Sidebar";
import { AgentChat } from "@/components/AgentChat";
import { DashboardStats } from "@/components/DashboardStats";
import { Menu, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const { session, loading, user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackToHome = () => {
    setSelectedAgent(null);
  };

  if (loading) return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-blue-950 w-full">
      <div className="flex h-screen w-full">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-900/50 text-blue-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Back Button (Mobile) */}
        {selectedAgent && (
          <button
            onClick={handleBackToHome}
            className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-blue-900/50 text-blue-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`${
                isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'
              } w-[280px] shrink-0 border-r border-blue-500/20 bg-blue-950`}
            >
              <Sidebar
                selectedAgent={selectedAgent || agents[0]}
                onAgentSelect={(agent) => {
                  setSelectedAgent(agent);
                  if (isMobile) setIsSidebarOpen(false);
                }}
                onHomeClick={handleBackToHome}
                user={user}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedAgent ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full w-full"
              >
                <AgentChat agent={selectedAgent} />
              </motion.div>
            ) : (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full w-full p-6"
              >
                <DashboardStats 
                  user={user} 
                  onAgentSelect={(agent) => setSelectedAgent(agent)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
} 