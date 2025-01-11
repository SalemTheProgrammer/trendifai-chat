"use client";

import { motion } from "framer-motion";
import { Brain, Lightbulb, Cog, LineChart } from "lucide-react";

const steps = [
  {
    title: "Comprendre vos besoins",
    description: "Chaque entreprise est unique. Nous analysons vos objectifs pour identifier où l'IA apporte le plus de valeur.",
    icon: Brain
  },
  {
    title: "Solutions sur mesure",
    description: "Nos experts créent des solutions IA adaptées, de l'automatisation au machine learning personnalisé.",
    icon: Lightbulb
  },
  {
    title: "Construction et intégration",
    description: "Intégration transparente des solutions IA dans vos systèmes existants.",
    icon: Cog
  },
  {
    title: "Optimisation continue",
    description: "Amélioration continue de vos outils IA pour garantir des performances optimales.",
    icon: LineChart
  }
];

export function Process() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Notre Processus
          </h2>
          <p className="text-xl text-blue-400/80 max-w-3xl mx-auto">
            Une approche méthodique pour transformer votre vision en réalité
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
              <div className="relative p-6 rounded-xl border border-blue-500/20 bg-blue-950/20 backdrop-blur-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-3 mb-4">
                  <step.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-200 mb-3">
                  {step.title}
                </h3>
                <p className="text-blue-400/80">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}