"use client";

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

const starColors = [
  'rgba(255, 255, 255, 0.8)',
  'rgba(255, 244, 234, 0.8)',
  'rgba(162, 184, 255, 0.6)',
];

export function Login() {
  const router = useRouter();
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll();

  // Generate stars with useMemo for performance
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.3 + 0.1,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      duration: 3 + Math.random() * 2,
      brightness: Math.random() * 0.3 + 0.3
    }));
  }, []);

  // Parallax effect
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

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
    <section className="min-h-screen relative">
      {/* Stars Background */}
      <motion.div 
        style={{ y: parallax }}
        className="fixed inset-0 overflow-hidden pointer-events-none bg-[#000008]"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full transform-gpu"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            }}
            animate={{
              opacity: [star.brightness * 0.5, star.brightness, star.brightness * 0.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Home Link */}
        <Link 
          href="/"
          className="absolute top-8 left-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        {/* Development Notice */}
        <div className="w-full max-w-md mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center"
          >
            <p className="text-blue-200">
              En cours de développement. Nous vous informerons dès que la plateforme sera prête.
            </p>
          </motion.div>
        </div>

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
      </div>
    </section>
  );
} 