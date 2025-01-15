"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Sidebar, Agent, agents } from "@/components/Sidebar";
import { RagChat } from "@/components/RagChat";
import { Menu } from "lucide-react";

export default function RagPage() {
  const router = useRouter();
  const { session, loading, user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents.find(a => a.id === 'rag') || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-blue-950">
      <div className="flex h-screen">
        <Sidebar
          selectedAgent={selectedAgent}
          onAgentSelect={(agent) => {
            setSelectedAgent(agent);
            if (agent.id === 'contact') {
              router.push('/dashboard/contact');
            }
          }}
          onHomeClick={() => router.push('/dashboard')}
          user={user}
        />
        
        <main className="flex-1 overflow-hidden">
          <RagChat />
        </main>
      </div>
    </div>
  );
} 