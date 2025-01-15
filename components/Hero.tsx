"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ChatModal } from "./ChatModal";


export default function AgentiaHero() {
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  const [text, setText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fullText = "Transformez votre entreprise grâce à nos solutions d'IA sur mesure. De l'automatisation à l'analyse prédictive, innovez avec Agentia.";
  
  useEffect(() => {
    checkAuth();
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleDemoClick = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center 
        px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 
              to-blue-700/10 border border-blue-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-sm sm:text-base text-blue-400 font-medium">
                Propulsé par l&apos;Intelligence Artificielle
              </span>
            </div>
          </motion.div>

          <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8"
            >
              Solutions d&apos;
              <span className="bg-clip-text text-transparent bg-gradient-to-r 
                from-blue-400 via-blue-500 to-blue-600"
              >
                Intelligence Artificielle
              </span>
              <br />
              pour l&apos;Entreprise de Demain
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg lg:text-xl text-blue-200/80 
                max-w-3xl mx-auto mb-8 sm:mb-12"
            >
              {text}
              <span className="animate-pulse">|</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-10"
            >
              <button
                onClick={() => setShowChat(true)}
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 
                  bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl overflow-hidden
                  hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2 text-base 
                  sm:text-lg font-medium text-white group-hover:text-white/90">
                  <Bot className="w-5 h-5" />
                  Parler avec notre assistant
                </span>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 
              max-w-4xl mx-auto"
          >
            {[
              { value: "99%", label: "Satisfaction Client" },
              { value: "24/7", label: "Support IA" },
              { value: "+500", label: "Entreprises" },
              { value: "15+", label: "Solutions IA" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-blue-300/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  );
}