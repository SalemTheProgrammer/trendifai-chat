"use client";

import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function SpaceHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        router.push('/'); // Redirect to home when logged out
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleAuth = async () => {
    if (user) {
      try {
        await supabase.auth.signOut();
        toast.success('Déconnexion réussie');
        router.push('/');
      } catch (error: any) {
        toast.error('Erreur lors de la déconnexion');
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-blue-200 cursor-pointer"
            onClick={() => router.push('/')}
          >
            Agentia
          </motion.div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-blue-200 text-sm hidden sm:block">
                {user.email}
              </span>
            )}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/20 
                hover:bg-blue-600/30 transition-all duration-200 text-blue-200 hover:scale-105"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </nav>
    </header>
  );
} 