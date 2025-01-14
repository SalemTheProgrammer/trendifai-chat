"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import { toast } from 'sonner';

export function EmailProcessor() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      toast.success('Email traité et réponse envoyée avec succès!');
      setEmail('');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-blue-900/20 border border-blue-500/20">
      <h2 className="text-xl font-bold text-blue-200 mb-4">
        Traitement des Emails
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Collez le contenu de l'email ici..."
            className="w-full h-40 px-4 py-3 rounded-xl bg-blue-950/50 border border-blue-500/20 
              text-blue-200 placeholder-blue-400/50 focus:outline-none focus:border-blue-500/40"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || !email.trim()}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl 
            bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 
            text-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Traiter l&apos;email
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
} 