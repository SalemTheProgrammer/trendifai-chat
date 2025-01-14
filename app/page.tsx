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
import BackgroundEffects from '@/components/BackgroundEffects';

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <SpaceHeader />
      
      <Suspense fallback={null}>
        <BackgroundEffects />
      </Suspense>

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