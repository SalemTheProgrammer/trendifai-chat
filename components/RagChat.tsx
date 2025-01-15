"use client";

import { useState, useRef, useEffect } from 'react';
import { FileText, Upload, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';

const UserIcon = ({ letter }: { letter: string }) => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 
    flex items-center justify-center text-white font-medium text-sm">
    {letter}
  </div>
);

const RobotIcon = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 
    flex items-center justify-center">
    <FileText className="w-5 h-5 text-white" />
  </div>
);

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  isFile?: boolean;
}

export function RagChat() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chat history on mount
  useEffect(() => {
    async function loadChatHistory() {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`/api/messages?userId=${user.id}&agent=rag`);
        const data = await response.json();
        
        if (data.length > 0) {
          setMessages(data.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            role: msg.role,
            created_at: msg.created_at,
            isFile: msg.content.startsWith('Fichier téléchargé:')
          })));
        } else {
          setMessages([{
            id: 'welcome',
            content: "Bonjour! Je suis votre assistant documentation. Je peux vous aider à analyser vos documents. Commencez par télécharger un fichier.",
            role: 'assistant',
            created_at: new Date().toISOString()
          }]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      } finally {
        setLoadingHistory(false);
      }
    }

    loadChatHistory();
  }, [user?.id]);

  const handleFileSelect = async (selectedFile: File) => {
    if (!user?.id || loading) return;
    setLoading(true);

    try {
      // Check if file is already uploaded
      const existingFileMessage = messages.find(msg => 
        msg.isFile && msg.content.includes(selectedFile.name)
      );

      if (existingFileMessage) {
        setFile(selectedFile);
        return; // File already exists, just set it as active
      }

      const fileContent = await selectedFile.text();
      const response = await fetch('/api/rag/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileContent,
          fileName: selectedFile.name,
          userId: user.id
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed');

      setFile(selectedFile);
      setMessages(prev => [...prev, {
        id: `file-${Date.now()}`,
        content: `Fichier téléchargé: ${selectedFile.name}`,
        role: 'user',
        created_at: new Date().toISOString(),
        isFile: true
      }, {
        id: `response-${Date.now()}`,
        content: `J'ai analysé votre fichier "${selectedFile.name}" (${data.processedChunks} sections traitées). Vous pouvez maintenant me poser des questions sur son contenu.`,
        role: 'assistant',
        created_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('File upload error:', error);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: "Désolé, une erreur est survenue lors du téléchargement du fichier.",
        role: 'assistant',
        created_at: new Date().toISOString()
      }]);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !file || loading || !user?.id) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      content: message.trim(),
      role: 'user' as const,
      created_at: new Date().toISOString()
    };

    setMessage('');
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          userId: user.id,
          fileName: file.name,
          agent: 'rag'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => [...prev, {
        id: `response-${Date.now()}`,
        content: data.response,
        role: 'assistant',
        created_at: new Date().toISOString()
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: "Désolé, une erreur est survenue lors du traitement de votre message.",
        role: 'assistant',
        created_at: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-blue-950">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {msg.role === 'assistant' ? 
                <RobotIcon /> : 
                <UserIcon letter={user?.email?.[0].toUpperCase() || 'U'} />
              }
              <div className={`rounded-2xl p-4 max-w-[80%] ${
                msg.role === 'assistant' 
                  ? 'bg-blue-900/40 text-blue-200' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-3"
            >
              <RobotIcon />
              <div className="bg-blue-900/40 text-blue-200 rounded-2xl p-4">
                <div className="flex gap-2">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-blue-500/20">
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="p-3 rounded-xl bg-blue-900/40 text-blue-400 hover:bg-blue-900/60 
              transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={file ? "Posez vos questions sur le document..." : "Téléchargez d'abord un document..."}
            disabled={!file || loading}
            className="flex-1 bg-blue-950/50 border border-blue-500/20 rounded-xl px-4 py-3
              text-blue-200 placeholder-blue-400/60 focus:outline-none focus:border-blue-500/40
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading || !message.trim() || !file}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white
              hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
} 