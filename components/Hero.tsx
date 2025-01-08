"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Power, Sparkles, Zap, Bot, Send, ChevronDown } from 'lucide-react';
import axios from 'axios';

export default function FuturisticAgent() {
  interface Message {
    sender: string;
    text: string;
  }

  const API_URL = "https://trendifayv1.app.n8n.cloud/webhook/ff802cc0-90a9-4025-b40c-e21de09cc24c";

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userId = useRef<string>("");

  useEffect(() => {
    // Generate and save a unique id for the user if it doesn't exist
    const savedId = localStorage.getItem("user_id");
    if (savedId) {
      userId.current = savedId;
    } else {
      const newId = crypto.randomUUID();
      localStorage.setItem("user_id", newId);
      userId.current = newId;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    setShowScrollIndicator(scrollHeight - scrollTop - clientHeight > 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        sender: "ai",
        text: "SYSTÈME INITIALISÉ. Cette interface peut sembler peu conventionnelle, mais je suis ici pour vous guider à travers notre réseau neuronal avancé. Que souhaitez-vous explorer ?"
      }]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}?id=${userId.current}`, { message: text });
      const { output } = response.data;
      setMessages(prev => [...prev, { sender: "ai", text: output || "No response received from the server." }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { sender: "ai", text: "An error occurred while processing your request." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.1),transparent)]" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-screen p-4">
        <div className="relative h-full backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-[0_0_50px_0_rgba(59,130,246,0.3)] bg-gradient-to-b from-gray-900/90 to-black/90">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-6 h-6 text-blue-400" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-blue-400 font-mono text-sm font-bold tracking-wider">NEXUS_AI v3.0</span>
                <span className="text-blue-500/60 text-xs">Quantum Processing Unit Active</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
              </motion.div>
              <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Chat container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-[calc(100vh-12rem)] overflow-y-auto p-6 space-y-4 scroll-smooth
              scrollbar-thin scrollbar-track-gray-900/20 scrollbar-thumb-blue-600/50
              hover:scrollbar-thumb-blue-500/80 transition-colors duration-300"
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-6 py-3 rounded-2xl backdrop-blur-sm 
                    ${msg.sender === "user" 
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/20 border border-blue-400/20" 
                      : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-900/30"
                    } hover:scale-[1.02] transition-all duration-300`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex space-x-2 px-6 py-3 bg-gray-800/80 w-24 rounded-2xl"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{
                        y: [-3, 3, -3],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll indicator */}
          {showScrollIndicator && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToBottom}
              className="absolute bottom-24 right-6 p-2 rounded-full bg-blue-600/20 border border-blue-500/30
                hover:bg-blue-600/40 transition-colors duration-300"
            >
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </motion.button>
          )}

          {/* Input area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/20 bg-gradient-to-t from-gray-900/90 to-transparent backdrop-blur-sm">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Initiate query sequence..."
                className="flex-1 bg-gray-800/50 text-blue-300 placeholder-blue-500/50 px-6 py-3 rounded-xl 
                  border border-blue-500/30 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 
                  transition-all duration-300 backdrop-blur-xl shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 
                  text-white rounded-xl transition-all duration-300 flex items-center space-x-2 group 
                  hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 border border-blue-400/20"
              >
                <span>SEND</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
