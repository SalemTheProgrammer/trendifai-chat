"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Sidebar, Agent, agents } from "@/components/Sidebar";
import { AgentChat } from "@/components/AgentChat";

export default function ContactPage() {
  const router = useRouter();
  const { session, loading, user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(
    agents.find(a => a.id === 'contact') || null
  );

  if (loading) return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-blue-950">
      <div className="flex h-screen">
        <Sidebar
          selectedAgent={selectedAgent}
          onAgentSelect={(agent) => {
            setSelectedAgent(agent);
            if (agent.id === 'rag') {
              router.push('/dashboard/rag');
            }
          }}
          onHomeClick={() => router.push('/dashboard')}
          user={user}
        />
        
        <main className="flex-1 overflow-hidden">
          {selectedAgent && <AgentChat agent={selectedAgent} />}
        </main>
      </div>
    </div>
  );
} 