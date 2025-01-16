"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { UserInteraction, DashboardStats } from '@/lib/types/dashboard';
import { 
  Users, Mail, TrendingUp, MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const [prospects, setProspects] = useState<UserInteraction[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalInteractions: 0,
    emailsSent: 0,
    activeProspects: 0,
    conversionRate: 0
  });
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    fetchDashboardData();
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserEmail(user.email || '');
    }
  };

  const fetchDashboardData = async () => {
    const { data: interactions } = await supabase
      .from('chat_interactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (interactions) {
      setProspects(interactions);
      
      const stats: DashboardStats = {
        totalInteractions: interactions.length,
        emailsSent: interactions.filter(i => i.type === 'email').length,
        activeProspects: interactions.filter(i => i.status === 'active').length,
        conversionRate: Math.round((interactions.filter(i => i.status === 'converted').length / interactions.length) * 100)
      };
      
      setStats(stats);
    }
  };

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-700/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/20" />

      {/* Content */}
      <div className="relative space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-blue-600/10 to-blue-700/10 border border-blue-500/20 
          backdrop-blur-xl rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-blue-200 mb-2">
            Bienvenue, {userEmail}
          </h1>
          <p className="text-blue-200/70">
            Voici un aperçu de vos activités récentes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Interactions"
            value={stats.totalInteractions}
            icon={Users}
            gradient="from-blue-500/20 to-blue-600/20"
          />
          <StatCard
            title="Emails Envoyés"
            value={stats.emailsSent}
            icon={Mail}
            gradient="from-purple-500/20 to-purple-600/20"
          />
          <StatCard
            title="Prospects Actifs"
            value={stats.activeProspects}
            icon={TrendingUp}
            gradient="from-emerald-500/20 to-emerald-600/20"
          />
          <StatCard
            title="Taux de Conversion"
            value={`${stats.conversionRate}%`}
            icon={MessageSquare}
            gradient="from-rose-500/20 to-rose-600/20"
          />
        </div>

        {/* Recent Prospects */}
        <div className="bg-gradient-to-br from-blue-600/10 to-blue-700/10 border border-blue-500/20 
          backdrop-blur-xl rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-200 mb-6">Prospects Récents</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-blue-500/20">
                  <th className="pb-4 text-blue-300/70">Nom</th>
                  <th className="pb-4 text-blue-300/70">Email</th>
                  <th className="pb-4 text-blue-300/70 hidden md:table-cell">Téléphone</th>
                  <th className="pb-4 text-blue-300/70 hidden lg:table-cell">Projet</th>
                  <th className="pb-4 text-blue-300/70">Status</th>
                  <th className="pb-4 text-blue-300/70">Action</th>
                </tr>
              </thead>
              <tbody>
                {prospects.slice(0, 5).map((prospect) => (
                  <tr key={prospect.id} className="border-b border-blue-500/10">
                    <td className="py-4 text-blue-200">{prospect.name || 'Anonyme'}</td>
                    <td className="py-4 text-blue-200">{prospect.email}</td>
                    <td className="py-4 text-blue-200 hidden md:table-cell">{prospect.phone || '-'}</td>
                    <td className="py-4 text-blue-200 hidden lg:table-cell">{prospect.projectType || '-'}</td>
                    <td className="py-4">
                      <StatusBadge status={prospect.status} />
                    </td>
                    <td className="py-4">
                      <button className="p-2 hover:bg-blue-600/20 rounded-lg transition-colors">
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, gradient }: {
  title: string;
  value: number | string;
  icon: any;
  gradient: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} border border-blue-500/20 
      backdrop-blur-xl rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300`}>
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-900/40 rounded-xl">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-blue-200/70">{title}</p>
          <p className="text-2xl font-bold text-blue-200">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'converted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
} 