"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2, MessageSquare, Brain, Sparkles,  Code, Building, Users, ShieldCheck, BarChart2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const agents = [
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
    available: false,
    welcomeMessage: 'Bientôt disponible'
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

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);

  // Reset messages when agent changes
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: selectedAgent.welcomeMessage || '',
        timestamp: Date.now()
      }
    ]);
    setError(null);
  }, [selectedAgent]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    const newMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      setIsLoading(true);
      const response = await fetch('https://web-uba09bnzh3sd.up-de-fra1-k8s-1.apps.run-on-seenode.com/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          user_id: userId
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur de communication avec le serveur');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || data.message,
        timestamp: Date.now()
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[700px] bg-gradient-to-b from-blue-950 to-black rounded-2xl border border-blue-500/20 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-4 h-full">
              {/* Agents List */}
              <div className="col-span-1 border-r border-blue-500/20 p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold text-blue-200 mb-4">Nos Agents IA</h3>
                <div className="space-y-2">
                  {agents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => agent.available && setSelectedAgent(agent)}
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

              {/* Chat Interface */}
              <div className="col-span-3 p-6 flex flex-col h-full">
                {/* Agent Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-3">
                    <selectedAgent.icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-200">{selectedAgent.name}</h3>
                    <p className="text-blue-400/80 text-sm">{selectedAgent.description}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.timestamp}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-xl ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-950/50 border border-blue-500/20 text-blue-200'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-blue-950/50 border border-blue-500/20 p-4 rounded-xl">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                      </div>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-center"
                    >
                      <div className="bg-red-950/50 border border-red-500/20 p-4 rounded-xl text-red-400">
                        {error}
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tapez votre message..."
                    disabled={!selectedAgent.available}
                    className="flex-1 px-4 py-3 bg-blue-950/50 border border-blue-500/20 rounded-xl
                      text-blue-200 placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim() || !selectedAgent.available}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700
                      text-white rounded-xl px-6 hover:shadow-lg hover:shadow-blue-500/30 
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 