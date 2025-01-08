"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A051E] to-[#120B2E]" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floating ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-glow">
            Let's Build Your AI Future Together!
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Have a question, want to book a meeting, or need assistance? Our team is here to help. 
            Reach out today, and let's explore how we can bring AI to your business.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#contact-form"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 py-4 font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <span>Contact Us Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#meeting-scheduler"
              className="inline-flex items-center space-x-2 bg-white/10 text-white rounded-full px-8 py-4 font-semibold hover:bg-white/20 transition-all duration-200"
            >
              <span>Schedule a Meeting</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 






