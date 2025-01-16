"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Bot } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactInfo {
  name: string | null;
  email: string | null;
}

const RobotIcon = () => (
  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-1.5
    shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_20px_rgba(99,102,241,0.7)] transition-shadow">
    <Bot className="w-full h-full text-white drop-shadow-lg" strokeWidth={1.5} />
  </div>
);

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<{name?: string, email?: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load context from localStorage on mount
  useEffect(() => {
    const savedContext = localStorage.getItem('agentia-chat-context');
    if (savedContext) {
      setContext(JSON.parse(savedContext));
      setMessages([{
        role: 'assistant',
        content: `Rebonjour! Comment puis-je vous aider aujourd'hui?`
      }]);
    } else {
      setMessages([{
        role: 'assistant',
        content: 'Bonjour! Pour mieux vous aider, pourriez-vous me donner votre nom et email?'
      }]);
    }
  }, []);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle mobile viewport height adjustments
  useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = {
      content: message,
      role: 'user'
    };

    setMessage('');
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          context: context
        }),
      });

      const data = await response.json();
      
      if (data.contactInfo?.name || data.contactInfo?.email) {
        const newContext = {
          name: data.contactInfo.name || context?.name,
          email: data.contactInfo.email || context?.email
        };
        setContext(newContext);
        localStorage.setItem('agentia-chat-context', JSON.stringify(newContext));
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Désolé, une erreur est survenue.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`
              w-full sm:w-[32rem] 
              bg-gradient-to-b from-slate-900/95 via-blue-950/95 to-slate-900/95
              backdrop-blur-xl
              flex flex-col h-[75vh] sm:h-[600px]
              mx-auto sm:mx-auto sm:my-8
              rounded-t-2xl sm:rounded-2xl
              border border-indigo-500/20
              shadow-[0_0_25px_rgba(99,102,241,0.2)]
              overflow-hidden
              relative
            `}
          >
            {/* Ambient background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.1),transparent_50%)]" />

            {/* Header */}
            <div className="relative p-3 sm:p-4 border-b border-indigo-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RobotIcon />
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 
                      bg-clip-text text-transparent">Assistant Agentia</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm text-blue-300/80 truncate max-w-[150px] sm:max-w-none">
                        {context?.name || 'Comment puis-je vous aider ?'}
                      </p>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                        <span className="text-xs text-emerald-400/90">En ligne</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-1.5 rounded-lg hover:bg-white/5 text-blue-300/80 hover:text-blue-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="relative flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin 
              scrollbar-thumb-indigo-500/20 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && <RobotIcon />}
                  
                  <div className={`max-w-[85%] p-3 sm:p-3.5 rounded-2xl shadow-lg text-sm 
                    ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-indigo-500/20'
                      : 'bg-white/5 text-blue-200 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="relative p-3 sm:p-4 border-t border-indigo-500/20 bg-slate-900/50">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 bg-white/5 border border-indigo-500/20 rounded-xl 
                    px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base
                    text-blue-200 placeholder-blue-400/50
                    focus:outline-none focus:border-indigo-500/50
                    focus:ring-1 focus:ring-indigo-500/20 
                    shadow-[0_0_10px_rgba(99,102,241,0.1)]
                    transition-all"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white disabled:opacity-50 
                    hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]
                    active:scale-95 transition-all duration-200"
                >
                  {loading ? 
                    <Loader2 className="w-5 h-5 animate-spin" /> : 
                    <Send className="w-5 h-5" strokeWidth={1.5} />
                  }
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 