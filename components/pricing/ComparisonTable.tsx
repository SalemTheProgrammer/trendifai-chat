"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  {
    name: "AI Agent Development",
    starter: true,
    professional: true,
    enterprise: true,
    description: "Custom AI agents for your business needs"
  },
  {
    name: "Workflow Automation",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Enterprise-grade",
    description: "Automate repetitive tasks and processes"
  },
  {
    name: "Integration Points",
    starter: "5 integrations",
    professional: "10 integrations",
    enterprise: "Unlimited",
    description: "Connect with your existing tools and systems"
  },
  {
    name: "Support",
    starter: "Email support",
    professional: "Priority support",
    enterprise: "24/7 dedicated support",
    description: "Get help when you need it"
  },
  {
    name: "Custom LLM Development",
    starter: false,
    professional: "Basic",
    enterprise: "Advanced",
    description: "Tailored language models for your use case"
  },
  {
    name: "API Access",
    starter: "Limited",
    professional: true,
    enterprise: "Full access",
    description: "Access to our API endpoints"
  },
  {
    name: "Analytics Dashboard",
    starter: "Basic metrics",
    professional: "Advanced analytics",
    enterprise: "Real-time + Custom",
    description: "Track and analyze performance"
  },
  {
    name: "Training Sessions",
    starter: "1 session",
    professional: "4 sessions",
    enterprise: "Unlimited",
    description: "Learn how to use your AI solutions"
  }
];

export function ComparisonTable() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Compare Plans
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find the perfect plan for your business needs
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-4 px-6 text-left text-gray-400 font-normal w-1/3">Features</th>
                <th className="py-4 px-6 text-center text-white font-semibold">Starter</th>
                <th className="py-4 px-6 text-center text-white font-semibold">Professional</th>
                <th className="py-4 px-6 text-center text-white font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <p className="font-medium text-white">{feature.name}</p>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{feature.starter}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.professional === 'boolean' ? (
                      feature.professional ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{feature.professional}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{feature.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
} 














