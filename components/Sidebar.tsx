"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, MessageSquare, TrendingUp, 
  Database, Cog, Menu, X, LogOut, 
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Using the agents from AIAgents for consistency
const agents = [
  {
    title: "Agent Support Client",
    description: "Support 24/7 instantané",
    icon: MessageSquare,
    status: "Bientôt disponible",
    gradient: "from-blue-500/20 via-cyan-400/10 to-blue-600/20"
  },
  {
    title: "Assistant Commercial",
    description: "Recommandations personnalisées",
    icon: TrendingUp,
    status: "En développement",
    gradient: "from-purple-500/20 via-violet-400/10 to-purple-600/20"
  },
  {
    title: "Analyste de Données",
    description: "Insights actionnables",
    icon: Database,
    status: "Bientôt disponible",
    gradient: "from-emerald-500/20 via-teal-400/10 to-emerald-600/20"
  },
  {
    title: "Spécialiste Automatisation",
    description: "Automatisation des tâches",
    icon: Cog,
    status: "En développement",
    gradient: "from-rose-500/20 via-pink-400/10 to-rose-600/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      setUserEmail(user.email);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any local state/storage if needed
      setUserEmail('');
      
      // Redirect to login page
      router.push('/login');
      router.refresh(); // Force a refresh to clear any cached data
    } catch (error) {
      console.error('Error during logout:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 left-6 z-50 p-2.5
          bg-gradient-to-br from-blue-600/10 to-blue-700/10
          border border-blue-500/20 backdrop-blur-xl
          rounded-full md:hidden 
          hover:border-blue-500/30 hover:shadow-blue-500/20
          transition-all duration-300 shadow-lg"
      >
        {isMobileMenuOpen ? 
          <X className="w-5 h-5 text-blue-400" /> : 
          <Menu className="w-5 h-5 text-blue-400" />
        }
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen
        bg-blue-950/90 border-r border-blue-500/20
        backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo section with toggle */}
        <div className="flex items-center h-20 px-6 border-b border-blue-500/20">
          {!isCollapsed ? (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 
              bg-clip-text text-transparent flex-1">
              Agentia
            </h1>
          ) : (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 
              bg-clip-text text-transparent">
              A
            </h1>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-blue-900/40 rounded-full transition-colors"
          >
            {isCollapsed ? 
              <ChevronRight className="w-5 h-5 text-blue-400" /> : 
              <ChevronLeft className="w-5 h-5 text-blue-400" />
            }
          </button>
        </div>

        {/* Dashboard with Agents */}
        <div className="p-4">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200 group
              ${pathname === '/dashboard'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' 
                : 'text-blue-300/70 hover:bg-blue-900/50 hover:text-blue-200'}
            `}
          >
            <LayoutDashboard className="w-5 h-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          {/* Agents Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-2"
          >
            <h3 className={`text-sm font-medium text-blue-400/60 mb-3 
              ${isCollapsed ? 'text-center px-0' : 'px-4'}`}>
              {isCollapsed ? 'IA' : 'Agents IA'}
            </h3>

            {agents.map((agent, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`relative group overflow-hidden rounded-xl
                  bg-gradient-to-br ${agent.gradient}
                  border border-white/10 backdrop-blur-sm
                  cursor-not-allowed
                  ${isCollapsed ? 'p-3' : 'p-4'}`}
              >
                {/* Content */}
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent 
                      rounded-full blur-lg transform -translate-y-1/2" />
                    <agent.icon className={`relative text-blue-100 
                      ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
                  </motion.div>

                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-100">{agent.title}</p>
                      <p className="text-xs text-blue-200/60">{agent.status}</p>
                    </div>
                  )}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/20 
          backdrop-blur-sm bg-blue-950/50">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl
            ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 
              flex items-center justify-center text-white font-medium">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-200 truncate">
                  {userEmail.split('@')[0]}
                </p>
                <p className="text-xs text-blue-400/60 truncate">{userEmail}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl
              text-red-400 hover:bg-red-500/10 transition-colors
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
} 