"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { Agent } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';
import { useVoiceChat } from '@/hooks/useVoiceChat';

interface AgentChatProps {
  agent: Agent;
}

// Assistant (Robot) Icon Component
const RobotIcon = () => (
  <div className="relative">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 
      shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all">
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2a2.5 2.5 0 012.5 2.5v1h3a2.5 2.5 0 012.5 2.5v3h1a1 1 0 011 1v4a1 1 0 01-1 1h-1v3a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 19.5v-3H3a1 1 0 01-1-1v-4a1 1 0 011-1h1v-3A2.5 2.5 0 016.5 5.5h3v-1A2.5 2.5 0 0112 2zM8.5 9.5a3 3 0 100 6 3 3 0 000-6zm7 0a3 3 0 100 6 3 3 0 000-6z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-400 
      ring-2 ring-blue-950 animate-pulse" />
  </div>
);

// User Icon Component
const UserIcon = ({ letter }: { letter: string }) => (
  <div className="relative">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600
      flex items-center justify-center shadow-lg group transition-all duration-300
      hover:shadow-blue-500/30">
      <div className="w-full h-full rounded-full p-2 bg-gradient-to-br from-blue-500/20 to-transparent
        flex items-center justify-center group-hover:from-blue-500/30 transition-all">
        <span className="text-lg font-semibold text-white">
          {letter}
        </span>
      </div>
    </div>
    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-400 
      ring-2 ring-blue-950" />
  </div>
);

export function AgentChat({ agent }: AgentChatProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isListening,
    startListening,
    stopListening,
    transcript,
    isProcessing
  } = useVoiceChat();

  // Add loading state for initial history fetch
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Load chat history on mount
  useEffect(() => {
    async function loadChatHistory() {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`/api/messages?userId=${user.id}`);
        const data = await response.json();
        
        if (data.length > 0) {
          // Only set non-system messages and include metadata
          setMessages(data.map((msg: { content: any; role: any; metadata: any; created_at: any; }) => ({
            content: msg.content,
            role: msg.role,
            metadata: msg.metadata,
            created_at: msg.created_at
          })));
        } else {
          setMessages([{
            content: agent.welcomeMessage || `Bonjour! Je suis ${agent.name}. Comment puis-je vous aider?`,
            role: 'assistant',
            created_at: new Date().toISOString()
          }]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        setMessages([{
          content: agent.welcomeMessage || `Bonjour! Je suis ${agent.name}. Comment puis-je vous aider?`,
          role: 'assistant',
          created_at: new Date().toISOString()
        }]);
      } finally {
        setLoadingHistory(false);
      }
    }

    loadChatHistory();
  }, [user?.id, agent]);

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = {
      content: message,
      role: 'user',
      created_at: new Date().toISOString(),
      agent : 'chat'
    };

    // Clear input immediately
    setMessage('');
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          userId: user?.id,
          agentId: agent.id
        }),
      });

      const data = await response.json();
      
      // Add AI response after receiving it
      setMessages(prev => [...prev, {
        content: data.response,
        role: 'assistant',
        created_at: new Date().toISOString()
      }]);

      await new Promise(resolve => setTimeout(resolve, 500));
      setIsTyping(false);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        content: "Désolé, une erreur est survenue.",
        role: 'assistant',
        created_at: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl p-2.5 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-500 
            shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
            <agent.icon className="w-full h-full text-white drop-shadow-lg" 
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-200">{agent.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-sm text-blue-400">{agent.description}</p>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">En ligne</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter(msg => msg.role !== 'system')
          .map((msg, index) => (
            <motion.div
              key={msg.created_at + index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && <RobotIcon />}
              
              <div className={`max-w-[80%] p-3.5 rounded-2xl shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                  : 'bg-blue-900/40 text-blue-200 border border-blue-500/20'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <UserIcon letter={user?.email?.[0].toUpperCase() || '?'} />
              )}
            </motion.div>
          ))}
        
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-end gap-2"
            >
              <RobotIcon />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-blue-500/20">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              // Auto-reset if input is cleared
              if (e.target.value === '') {
                setIsTyping(false);
              }
            }}
            onKeyDown={(e) => {
              // Auto-reset on Escape key
              if (e.key === 'Escape') {
                setMessage('');
                setIsTyping(false);
              }
            }}
            placeholder={isListening ? "Parlez maintenant..." : "Écrivez votre message..."}
            className="flex-1 bg-blue-950/50 border border-blue-500/20 rounded-xl px-4 py-3
              text-blue-200 placeholder-blue-400/60 focus:outline-none focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/20 transition-all"
            disabled={loading || isListening}
          />
          
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={loading || isProcessing}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20'
                : 'bg-blue-900/40 text-blue-400 hover:bg-blue-800/40 border border-blue-500/20'
            } disabled:opacity-50 hover:shadow-lg`}
          >
            {isListening ? (
              <div className="relative">
                <MicOff className="w-5 h-5" strokeWidth={1.5} />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 shadow-lg"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            ) : (
              <Mic className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="submit"
            disabled={!message.trim() || loading || isListening}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white 
              disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
            ) : (
              <Send className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 