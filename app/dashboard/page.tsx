"use client";

import { motion } from "framer-motion";
import { 
  Users, BarChart2, MessageSquare, PlusCircle,
  Mail, Phone, Building, Trash2, Edit, Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';
import { StatCard } from '@/components/StatCard';
import { Agent, Sidebar } from '@/components/Sidebar';
import { AddContactModal } from "@/components/AddContactModal";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  created_at: string;
}

interface Stats {
  totalContacts: number;
  activeChats: number;
  emailsSent: number;
  responseRate: number;
}

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    activeChats: 0,
    emailsSent: 0,
    responseRate: 0
  });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState({});



  // Fetch contacts and stats
  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setContacts(data);
  };

  const fetchStats = async () => {
    // Implement your stats fetching logic here
    // For now using dummy data
    setStats({
      totalContacts: contacts.length,
      activeChats: 3,
      emailsSent: 150,
      responseRate: 92
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-950 to-black">
      {/* Sidebar - Always visible */}
      <div className="w-80 flex-shrink-0 border-r border-blue-500/20 bg-blue-950/30">
        <Sidebar selectedAgent={selectedAgent as Agent} onAgentSelect={setSelectedAgent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Contacts"
            value={stats.totalContacts}
            icon={Users}
            trend="+5%"
          />
          <StatCard
            title="Conversations Actives"
            value={stats.activeChats}
            icon={MessageSquare}
            trend="+12%"
          />
          <StatCard
            title="Emails Envoyés"
            value={stats.emailsSent}
            icon={Mail}
            trend="+8%"
          />
          <StatCard
            title="Taux de Réponse"
            value={`${stats.responseRate}%`}
            icon={BarChart2}
            trend="+3%"
          />
        </div>

        {/* Contacts Section */}
        <div className="bg-blue-950/30 rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-blue-200">Contacts</h2>
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-blue-950/50 border border-blue-500/20 rounded-lg
                    text-blue-200 placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-400/60" />
              </div>
              <button
                onClick={() => setIsAddingContact(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700
                  text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <PlusCircle size={18} />
                Ajouter Contact
              </button>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-blue-400/60 border-b border-blue-500/20">
                  <th className="text-left py-3 px-4">Nom</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Téléphone</th>
                  <th className="text-left py-3 px-4">Entreprise</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-blue-500/10 hover:bg-blue-950/30">
                    <td className="py-3 px-4 text-blue-200">{contact.name}</td>
                    <td className="py-3 px-4 text-blue-300">{contact.email}</td>
                    <td className="py-3 px-4 text-blue-300">{contact.phone || '-'}</td>
                    <td className="py-3 px-4 text-blue-300">{contact.company || '-'}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 mr-3">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Contact Modal */}
        {isAddingContact && (
          <AddContactModal onClose={() => setIsAddingContact(false)} onAdd={fetchContacts} />
        )}
      </div>
    </div>
  );
} 