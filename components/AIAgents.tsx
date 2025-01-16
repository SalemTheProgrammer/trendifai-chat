"use client";

import { memo } from 'react';
import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, Database, Cog } from "lucide-react";

const agents = [
  {
    title: "Agents de Support Client",
    description: "Fournissez un support 24/7 avec des agents IA qui répondent instantanément et résolvent les requêtes.",
    icon: MessageSquare,
    stat: "60% plus rapide",
    gradient: "from-blue-500/20 via-cyan-400/10 to-blue-600/20"
  },
  {
    title: "Assistants Commerciaux",
    description: "Boostez vos ventes avec des assistants IA qui personnalisent les recommandations.",
    icon: TrendingUp,
    stat: "35% de conversion en plus",
    gradient: "from-purple-500/20 via-violet-400/10 to-purple-600/20"
  },
  {
    title: "Analystes de Données",
    description: "Transformez les données brutes en insights actionnables avec l'IA.",
    icon: Database,
    stat: "90% de précision",
    gradient: "from-emerald-500/20 via-teal-400/10 to-emerald-600/20"
  },
  {
    title: "Spécialistes en Automatisation",
    description: "Libérez votre équipe des tâches répétitives grâce à l'IA.",
    icon: Cog,
    stat: "40+ heures économisées par semaine",
    gradient: "from-rose-500/20 via-pink-400/10 to-rose-600/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export const AIAgents = memo(function AIAgents() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8"
    >
      {agents.map((agent) => (
        <motion.div
          key={agent.title}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${agent.gradient} 
            border border-white/10 backdrop-blur-sm p-6`}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Floating icon */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full 
              blur-lg transform -translate-y-1/2" />
            <agent.icon className="relative w-10 h-10 mb-4 text-white" />
          </motion.div>

          {/* Content */}
          <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{agent.title}</h3>
          <p className="text-sm text-blue-100/80 mb-4 leading-relaxed">{agent.description}</p>
          
          {/* Stats with glowing effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl" />
            <div className="relative text-sm font-medium text-blue-200 bg-blue-500/10 
              rounded-full px-4 py-1 inline-block">
              {agent.stat}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 via-white/2 
            to-transparent rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 via-white/2 
            to-transparent rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2" />
        </motion.div>
      ))}
    </motion.div>
  );
});