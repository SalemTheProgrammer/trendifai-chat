"use client";

import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, Database, Cog } from "lucide-react";
import { useState } from "react";

const agents = [
  {
    title: "Agents de Support Client",
    description: "Fournissez un support 24/7 avec des agents IA qui répondent instantanément et résolvent les requêtes.",
    icon: MessageSquare,
    stat: "60% plus rapide",
    demo: "/demos/support-agent.mp4"
  },
  {
    title: "Assistants Commerciaux",
    description: "Boostez vos ventes avec des assistants IA qui personnalisent les recommandations.",
    icon: TrendingUp,
    stat: "35% de conversion en plus",
    demo: "/demos/sales-agent.mp4"
  },
  {
    title: "Analystes de Données",
    description: "Transformez les données brutes en insights actionnables avec l'IA.",
    icon: Database,
    stat: "90% de précision",
    demo: "/demos/analyst-agent.mp4"
  },
  {
    title: "Spécialistes en Automatisation",
    description: "Libérez votre équipe des tâches répétitives grâce à l'IA.",
    icon: Cog,
    stat: "40+ heures économisées par semaine",
    demo: "/demos/automation-agent.mp4"
  }
];

export function AIAgents() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Nos Agents IA Intelligents
          </h2>
          <p className="text-xl text-blue-400/80 max-w-3xl mx-auto">
            Des solutions IA adaptées à chaque besoin de votre entreprise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              onClick={() => setActiveDemo(agent.demo)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
              <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-3">
                    <agent.icon className="w-full h-full text-white group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="text-sm font-medium text-blue-400">
                    {agent.stat}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-blue-200 mb-3">
                  {agent.title}
                </h3>
                <p className="text-blue-400/80">
                  {agent.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}