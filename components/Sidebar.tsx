"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, Home, LogOut,
  Settings, HelpCircle, FileText
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export interface Agent {
  id: string;
  name: string;
  icon: any;
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
    id: 'rag',
    name: 'Assistant Documentation',
    icon: FileText,
    description: 'Assistant Q&A pour vos documents',
    available: true,
    welcomeMessage: 'Bonjour! Je peux vous aider à analyser vos documents. Commencez par télécharger un fichier.'
  }
];

interface SidebarProps {
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent) => void;
  onHomeClick: () => void;
  user: any;
}

export function Sidebar({ selectedAgent, onAgentSelect, onHomeClick, user }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleAgentClick = (agent: Agent) => {
    onAgentSelect(agent);
    switch (agent.id) {
      case 'rag':
        router.push('/dashboard/rag');
        break;
      case 'contact':
        router.push('/dashboard/contact');
        break;
      default:
        router.push('/dashboard');
    }
  };

  return (
    <div className="h-full flex flex-col bg-blue-950/80 backdrop-blur-sm">
      <div className="p-4 border-b border-blue-500/20">
        <h1 className="text-xl font-bold text-blue-200 mb-1">Agentia</h1>
        <p className="text-sm text-blue-400">{user?.email}</p>
      </div>

      <div className="flex-1 p-4">
        <button 
          onClick={onHomeClick}
          className="w-full flex items-center gap-3 p-3 mb-6 rounded-xl
            bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-blue-200 
            hover:from-blue-600/30 hover:to-blue-500/30 transition-all
            border border-blue-500/20"
        >
          <Home className="w-5 h-5" />
          <span>Tableau de bord</span>
        </button>

        <div className="space-y-2 mb-6">
          <h2 className="px-3 text-sm font-medium text-blue-400 mb-2">Agents IA</h2>
          {agents.map((agent) => (
            <motion.button
              key={agent.id}
              onClick={() => handleAgentClick(agent)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                selectedAgent?.id === agent.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'hover:bg-blue-900/40 text-blue-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <agent.icon className="w-5 h-5" />
              <span>{agent.name}</span>
              {agent.available && (
                <span className="ml-auto w-2 h-2 rounded-full bg-green-400" />
              )}
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="px-3 text-sm font-medium text-blue-400 mb-2">Paramètres</h2>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-blue-200 hover:bg-blue-900/40 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-blue-200 hover:bg-blue-900/40 transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Aide</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-blue-500/20">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400
            hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
} 