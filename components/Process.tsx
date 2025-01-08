"use client";

import { motion } from "framer-motion";
import { Brain, Lightbulb, Cog, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Comprendre vos besoins",
    description: "Chaque entreprise est unique. Nous analysons vos objectifs et défis pour identifier où l'IA apporte le plus de valeur.",
    icon: Brain
  },
  {
    title: "Solutions sur mesure",
    description: "Nos experts créent des solutions IA adaptées, de l'automatisation aux modèles de machine learning personnalisés.",
    icon: Lightbulb
  },
  {
    title: "Construire et intégrer",
    description: "Intégration transparente des solutions IA dans vos systèmes existants, avec un impact minimal sur vos opérations.",
    icon: Cog
  },
  {
    title: "Optimiser et évoluer",
    description: "Amélioration continue de vos outils IA pour garantir des performances optimales pendant votre croissance.",
    icon: LineChart
  }
];

export function Process() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950" />
      
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              backgroundColor: 'white',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Comment nous révolutionnons votre entreprise avec l'IA
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Notre mission est de transformer vos défis professionnels en
            opportunités de croissance grâce aux technologies IA de pointe.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur" />
                <div className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl p-8 h-full border border-gray-700 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 mb-6">
                    <step.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">
            Prêt à révolutionner votre entreprise ? Construisons ensemble votre solution IA.
          </h3>
          <Link
            href="https://calendly.com/themetaversecompany/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-8 py-4 font-medium transition-all duration-200 hover:scale-105"
          >
            <span>Planifiez votre consultation gratuite</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Process;