"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  BarChart3, 
  Code2,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const highlights = [
  {
    icon: Zap,
    title: "AI Automation",
    description: "Accelerate your workflows and eliminate bottlenecks with AI-powered automation.",
    stat: "Save up to 50% on repetitive tasks"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make smarter, data-driven decisions with predictive AI insights.",
    stat: "Unlock hidden patterns in your business data"
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    description: "From language models to NLP solutions, we build tools tailored for you.",
    stat: "98% client satisfaction with bespoke AI models"
  }
];

export function Solutions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-600/30 rounded-full filter blur-[128px] pointer-events-none" />
      
      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 800">
          <pattern id="neural-net" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1" fill="currentColor" />
            <line x1="25" y1="25" x2="50" y2="25" stroke="currentColor" strokeWidth="0.5" />
            <line x1="25" y1="25" x2="25" y2="50" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#neural-net)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Transforming Ideas into
            <br />
            Intelligent Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Experience the power of AI to unlock innovation and elevate your business to new heights.
          </motion.p>
        </div>

        {/* Rest of the component remains the same */}
        {/* Split Screen */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
            <div className="relative dark-card rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                AI That Adapts to Your Business, Not the Other Way Around.
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Our AI solutions are tailored to align with your unique business needs, helping you automate, innovate, and scale effortlessly.
              </p>
              <Link
                href="/services"
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 py-3 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <span>See Our AI Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side - 3D Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-radial opacity-30" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/neural-network.svg')] bg-center bg-no-repeat bg-contain animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm" />
                <div className="relative dark-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:translate-y-[-2px]">
                  <div className="mb-6">
                    <item.icon className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {item.description}
                  </p>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-purple-500 font-medium"
                    >
                      {item.stat}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-gradient" />
          <div className="relative py-16 px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              From concept to execution, we bring your AI vision to life.
            </h3>
            <Link
              href="/contact"
              className="bg-white text-gray-900 rounded-full px-8 py-4 font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Let's Build Something Intelligent Together
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}