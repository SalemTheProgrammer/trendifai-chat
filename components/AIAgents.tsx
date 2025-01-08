"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  MessageSquare, 
  TrendingUp, 
  Database, 
  Cog, 
  Cpu,
  ArrowRight,
  Play
} from "lucide-react";
import Link from "next/link";

const agents = [
  {
    title: "Customer Support Agents",
    description: "Provide 24/7 support with AI agents that respond instantly, resolve queries, and enhance user satisfaction.",
    icon: MessageSquare,
    stat: "60% faster response times",
    demo: "/demos/support-agent.mp4"
  },
  {
    title: "Sales Assistants",
    description: "Boost your sales with AI-driven assistants that personalize recommendations and automate follow-ups.",
    icon: TrendingUp,
    stat: "35% increase in conversion rates",
    demo: "/demos/sales-agent.mp4"
  },
  {
    title: "Data Analysts",
    description: "Turn raw data into actionable insights with AI agents that identify trends, predict outcomes, and support decision-making.",
    icon: Database,
    stat: "90% accuracy in predictions",
    demo: "/demos/analyst-agent.mp4"
  },
  {
    title: "Task Automation Specialists",
    description: "Free your team from repetitive tasks by deploying AI agents to handle everything from data entry to scheduling.",
    icon: Cog,
    stat: "Save 40+ hours per week",
    demo: "/demos/automation-agent.mp4"
  },
  {
    title: "Custom-Built Agents",
    description: "Need something unique? We create AI agents specifically tailored to your business requirements.",
    icon: Cpu,
    stat: "100% customizable solutions",
    demo: "/demos/custom-agent.mp4"
  }
];

export function AIAgents() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-600/30 rounded-full filter blur-[128px] pointer-events-none" />
      
      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 800">
          <pattern id="neural-net-agents" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1" fill="currentColor" />
            <line x1="25" y1="25" x2="50" y2="25" stroke="currentColor" strokeWidth="0.5" />
            <line x1="25" y1="25" x2="25" y2="50" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#neural-net-agents)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Empower Your Business with
            <br />
            Intelligent AI Agents
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Revolutionize the way you work with AI agents tailored to your business needs. 
            Automate tasks, enhance customer experiences, and make smarter decisions faster.
          </p>
        </motion.div>

        {/* Rest of the component remains the same */}
        {/* Interactive Demo Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left Side - Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
            <div className="relative dark-card rounded-2xl overflow-hidden h-full">
              {activeDemo ? (
                <video
                  src={activeDemo}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Play className="w-16 h-16 text-gray-600" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="dark-card rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-white mb-6">
                AI Agents Designed to Work Smarter for You
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                From streamlining workflows to delivering personalized customer interactions, 
                our AI agents are designed to act as an extension of your team—efficient, 
                reliable, and always learning.
              </p>
              <button className="group flex items-center space-x-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-3 hover:shadow-lg transition-all duration-200 hover:scale-105">
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => {
                setHoveredIndex(index);
                setActiveDemo(agent.demo);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setActiveDemo(null);
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm" />
                <div className="relative dark-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:translate-y-[-2px]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-purple-600/10 rounded-xl">
                      <agent.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    {hoveredIndex === index && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-purple-500 font-medium"
                      >
                        {agent.stat}
                      </motion.span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {agent.title}
                  </h3>
                  <p className="text-gray-400">
                    {agent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Discover the AI Agent That Can Transform Your Business
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Schedule a Free Consultation
            </Link>
            <button className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-200">
              See How It Works
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}