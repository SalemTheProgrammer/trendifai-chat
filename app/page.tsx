"use client";

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SpaceHeader } from "@/components/SpaceHeader";
import { Process } from '@/components/Process';
import { AboutCTA } from '@/components/AboutCTA';
import { Footer } from '@/components/Footer';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Solutions } from '@/components/Solutions';
import { AIAgents } from '@/components/AIAgents';
import Hero from '@/components/Hero';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCallback, useMemo } from 'react';

const starColors = [
  'rgba(255, 255, 255, 0.8)',
  'rgba(255, 244, 234, 0.8)',
  'rgba(162, 184, 255, 0.6)',
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  // Optimize star generation using useMemo
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

  // Use scrollY for parallax effect
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="relative min-h-screen">
      <SpaceHeader />
      
      {/* Optimized Stars Background */}
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

      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <AIAgents />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Process />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Solutions />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <WhyChooseUs />
        </Suspense>
        
        <AboutCTA />
        <Footer />
      </div>
    </main>
  );
}