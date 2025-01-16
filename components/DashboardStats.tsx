"use client";

import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Users, Clock, Brain,
  ArrowRight, Sparkles, Search
} from 'lucide-react';

interface DashboardStatsProps {
  user: User | null;
  onAgentSelect: (agent: any) => void;
}

export function DashboardStats({ user, onAgentSelect }: DashboardStatsProps) {
  const metrics = [
    {
      label: 'Messages',
      value: '1,234',
      change: '+12%',
      icon: MessageSquare,
      color: 'from-blue-600 to-blue-400'
    },
    {
      label: 'Contacts',
      value: '56',
      change: '+5%',
      icon: Users,
      color: 'from-purple-600 to-purple-400'
    },
    {
      label: 'Temps moyen',
      value: '2.5m',
      change: '-8%',
      icon: Clock,
      color: 'from-green-600 to-green-400'
    },
    {
      label: 'Précision IA',
      value: '98%',
      change: '+2%',
      icon: Brain,
      color: 'from-orange-600 to-orange-400'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
          <input 
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-blue-950/50 border border-blue-500/20 
              rounded-xl text-blue-200 placeholder:text-blue-400/60 focus:outline-none 
              focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-blue-950/50 border border-blue-500/20 
              hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-blue-400">{metric.label}</p>
                <h3 className="text-2xl font-semibold text-blue-200 mt-1">
                  {metric.value}
                </h3>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color}`}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm ${
                metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
              <span className="text-sm text-blue-400">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-blue-950/50 border border-blue-500/20 overflow-hidden">
        <div className="p-4 border-b border-blue-500/20">
          <h2 className="text-lg font-semibold text-blue-200">Activité Récente</h2>
        </div>
        <div className="p-4">
          {/* Add your activity list here */}
        </div>
      </div>
    </div>
  );
} 