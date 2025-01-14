"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, Brain, Sparkles, Code, Building, 
  Users, ShieldCheck, BarChart2, LogOut 
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export interface Agent {
  id: string;
  name: string;
  icon: any; // You can make this more specific with LucideIcon if needed
  description: string;
  available: boolean;
  welcomeMessage?: string;
}

export const agents: Agent[] = [
  {
    id: 'contact',
    name: 'Assistant Contact',
    icon: MessageSquare,
    description: 'Agent de contact et d\'information',
    available: true,
    welcomeMessage: 'Bonjour! Je suis l\'assistant contact d\'Agentia. Comment puis-je vous aider aujourd\'hui?'
  },
  {
    id: 'tech',
    name: 'Expert Technique',
    icon: Code,
    description: 'Spécialiste en solutions techniques',
    available: false
  },
  {
    id: 'data',
    name: 'Analyste Data',
    icon: BarChart2,
    description: 'Expert en analyse de données',
    available: false
  },
  {
    id: 'business',
    name: 'Conseiller Business',
    icon: Building,
    description: 'Consultant en stratégie d\'entreprise',
    available: false
  },
  {
    id: 'security',
    name: 'Expert Sécurité',
    icon: ShieldCheck,
    description: 'Spécialiste en cybersécurité',
    available: false
  },
  {
    id: 'innovation',
    name: 'Innovation IA',
    icon: Brain,
    description: 'Consultant en innovation IA',
    available: false
  },
  {
    id: 'automation',
    name: 'Expert Automation',
    icon: Sparkles,
    description: 'Spécialiste en automatisation',
    available: false
  },
  {
    id: 'support',
    name: 'Support Client',
    icon: Users,
    description: 'Assistant support client',
    available: false
  }
];

interface SidebarProps {
  selectedAgent: Agent;
  onAgentSelect: (agent: Agent) => void;
}

export function Sidebar({ selectedAgent, onAgentSelect }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-blue-200 mb-4">Nos Agents IA</h3>
        <div className="space-y-2">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => agent.available && onAgentSelect(agent)}
              disabled={!agent.available}
              className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-all
                ${agent.available 
                  ? selectedAgent.id === agent.id
                    ? 'bg-blue-600/20 border border-blue-500/50'
                    : 'hover:bg-blue-950/50 border border-transparent hover:border-blue-500/30'
                  : 'opacity-50 cursor-not-allowed bg-blue-950/20 border border-blue-500/10'
                }`}
            >
              <div className={`w-10 h-10 rounded-lg p-2 flex-shrink-0 ${
                agent.available ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-blue-950'
              }`}>
                <agent.icon className="w-full h-full text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-blue-200 truncate">
                  {agent.name}
                </div>
                <div className="text-xs text-blue-400/80 truncate">
                  {agent.available ? agent.description : 'Bientôt disponible'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-500/20">
        <button
          onClick={handleLogout}
          className="w-full p-3 rounded-xl text-left flex items-center gap-3 
            text-red-400 hover:bg-red-500/10 border border-transparent 
            hover:border-red-500/30 transition-all"
        >
          <div className="w-10 h-10 rounded-lg p-2 flex-shrink-0 bg-red-500/10">
            <LogOut className="w-full h-full" />
          </div>
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
} 