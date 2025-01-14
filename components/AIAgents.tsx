"use client";

import { memo } from 'react';
import { MessageSquare, TrendingUp, Database, Cog } from "lucide-react";

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

// Memoize the entire component
export const AIAgents = memo(function AIAgents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {agents.map((agent) => (
        <div 
          key={agent.title}
          className="p-6 rounded-lg bg-gradient-to-br from-blue-600/10 to-purple-600/10"
        >
          <agent.icon className="w-8 h-8 mb-4 text-blue-500" />
          <h3 className="text-lg font-semibold mb-2">{agent.title}</h3>
          <p className="text-sm text-gray-300">{agent.description}</p>
          <div className="mt-4 text-sm font-medium text-blue-400">
            {agent.stat}
          </div>
        </div>
      ))}
    </div>
  );
});