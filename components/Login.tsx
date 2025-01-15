"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export function Login() {
  const router = useRouter();
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        toast.success('Connexion réussie!');
        // AuthProvider will handle the redirect
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(
        error.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect'
          : error.message || 'Erreur de connexion'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-blue-200">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-blue-400">
            Accédez à votre tableau de bord
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-blue-500/20 
                  bg-blue-950/20 placeholder-blue-400 text-blue-200 rounded-xl focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Adresse email"
                disabled={loading}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-blue-500/20 
                  bg-blue-950/20 placeholder-blue-400 text-blue-200 rounded-xl focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mot de passe"
                disabled={loading}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !email || !password}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent 
              rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 
              hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
} 