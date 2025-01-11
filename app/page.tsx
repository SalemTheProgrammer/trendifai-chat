"use client";

import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Process } from "@/components/Process";
import { Solutions } from "@/components/Solutions";
import { AIAgents } from "@/components/AIAgents";
import { AboutCTA } from "@/components/AboutCTA";
import { Footer } from "@/components/Footer";
import AgentiaHero from "@/components/Hero";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Animated Space Background */}
      <div className="fixed inset-0 bg-black">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Nebula Effect */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 60%)',
              animation: 'pulse 8s infinite'
            }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
              animation: 'pulse 12s infinite'
            }}
          />
        </div>

        {/* Shooting Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: `${Math.random() * 15}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-blue-950/10 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <AgentiaHero />
        <AIAgents />
        <Process />
        <Solutions />
        <WhyChooseUs />
        <AboutCTA />
        <Footer />
      </div>
    </main>
  );
}