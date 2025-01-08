"use client";

import { motion } from "framer-motion";
import { Users, Cpu, Zap, RefreshCw } from "lucide-react";

const steps = [
  {
    title: "Collaborative Partnership",
    description: "We work closely with your team to understand your processes, challenges, and goals.",
    icon: Users,
  },
  {
    title: "Tailored Solutions",
    description: "Every AI implementation is designed specifically for your business to ensure maximum impact.",
    icon: Cpu,
  },
  {
    title: "Automation First",
    description: "Our focus is on reducing human intervention as much as possible to streamline operations and enhance productivity.",
    icon: Zap,
  },
  {
    title: "Continuous Optimization",
    description: "AI isn't static. We continuously refine and improve our solutions to match your evolving needs.",
    icon: RefreshCw,
  },
];

export function AboutApproach() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A051E] to-[#120B2E]" />
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              How We Work: A Partnership for Growth
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              We don't just build AI solutions—we become an extension of your team. 
              Our approach focuses on understanding your unique challenges, identifying 
              opportunities for automation, and delivering solutions that align perfectly 
              with your business goals.
            </p>

            <div className="grid gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-2 bg-purple-600/10 rounded-lg">
                    <step.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - 3D Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl" />
            <div className="relative dark-card rounded-2xl aspect-square overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial opacity-30 animate-pulse" />
              {/* Add your 3D animation or illustration here */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}