"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Target } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    title: "No Hidden Fees",
    description: "Transparent pricing with all deliverables clearly outlined",
    icon: Shield
  },
  {
    title: "Tailored Solutions",
    description: "Flexible plans designed to fit your specific requirements",
    icon: Target
  },
  {
    title: "Guaranteed Results",
    description: "Measurable impact with clear deliverables and timelines",
    icon: Zap
  }
];

export function PricingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
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
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-glow">
            Affordable, Transparent, and<br />
            Tailored AI Solutions
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Whether you're automating workflows or developing custom AI agents, 
            our straightforward pricing ensures no surprises—just value.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#custom-quote"
              className="glow-effect px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              Get a Free Quote
            </Link>
            <Link
              href="#pricing-plans"
              className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-200"
            >
              Explore Plans
            </Link>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group card-hover"
            >
              <div className="gradient-border p-8 rounded-2xl bg-white/5 backdrop-blur-xl">
                <benefit.icon className="w-12 h-12 text-purple-500 mb-6 floating" />
                <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 





























































































































